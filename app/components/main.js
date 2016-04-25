/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  NetInfo,
  Dimensions
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import CommonStyles from '../styles/common';
import ScrollableTabView,{ DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {SetAuthrizatuon } from '../actions/userActions';
import {ChangeNetInfo,ChangeNetExpensiveStatus,ChangeNetConnectStatus} from '../actions/netInfoActions';
import OfflineNetView from './offlineNetView';
import ScrollTabView from './scrollTabView';

export default class Main extends Component {
    constructor (props) {
      super(props)
    }
    
    componentWillMount() { 
        if(this.props.userInfo==null) {
            global.storage.load({ key:'UserLoginInfo',autoSync:true,syncInBackground:false}).then(ret => {
                if(ret.UserInfo!=null)
                {
                    this.props.dispatch(SetAuthrizatuon(ret.UserName,ret.UserToken,ret.UserInfo));
                }
            }).catch( err => {
                //如果没有找到数据且没有同步方法，
                //或者有其他异常，则在catch中返回
                //Actions.login();
            })
        }          
    }
    
    componentDidMount()
    {
        NetInfo.addEventListener('change',this.handleConnectionInfoChange.bind(this));
        NetInfo.isConnected.addEventListener('change',this.handleConnectivityChange.bind(this));
        //获取网络当前信息
        NetInfo.fetch().done((connectionInfo) => {
            var info=this.switchConnectionInfo(connectionInfo);
            this.props.dispatch(ChangeNetInfo(info));
        });
        //获取网络当前连接状态
        NetInfo.isConnected.fetch().then((isConnected) => {
            this.props.dispatch(ChangeNetConnectStatus(isConnected));
        });
        //获取网络当前连接计费状态
        NetInfo.isConnectionExpensive().then((isConnectionExpensive) => {
            this.props.dispatch(ChangeNetExpensiveStatus(isConnectionExpensive));
        });    
    }
    
    componentWillUnmount()
    {
        NetInfo.removeEventListener('change',this.handleConnectionInfoChange.bind(this));
        NetInfo.isConnected.removeEventListener('change',this.handleConnectivityChange.bind(this));
    }
    
    handleConnectionInfoChange(connectionInfo)
    {
        var info=this.switchConnectionInfo(connectionInfo);
        this.props.dispatch(ChangeNetInfo(info));
        NetInfo.isConnectionExpensive().then((isConnectionExpensive) => {
            this.props.dispatch(ChangeNetExpensiveStatus(isConnectionExpensive));
        });
    }
    
    handleConnectivityChange(isConnected)
    {
        this.props.dispatch(ChangeNetConnectStatus(isConnected));
    }
    
    switchConnectionInfo(connectionInfo)
    {
          var netStatus='none';
          connectionInfo=connectionInfo.toLowerCase();
          switch (connectionInfo) {
            case 'wifi':          
              netStatus = 'wifi';
              break;
            case 'cell':           
            case 'mobile':
              netStatus = 'mobile';
              break;
            case 'unknown':           
              netStatus = 'unknown';
              break;                              
            default:
              netStatus = 'none';
              break;
          }
          return netStatus;
    }

    render() {
      if(!this.props.isConnected)
      {
          return <OfflineNetView/>
      }
      return (
        <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter,CommonStyles.marginNavTop]}>
            <ScrollableTabView style={{width:Dimensions.get('window').width}} renderTabBar={()=><DefaultTabBar underlineColor='#00a2ed' activeTextColor='#00a2ed' inactiveTextColor='#999'/>}>
                <ScrollTabView tabLabel="Tab1"/>
                <ScrollTabView tabLabel="Tab2"/>
                <ScrollTabView tabLabel="Tab3"/>
                <ScrollTabView tabLabel="Tab4"/>
            </ScrollableTabView>      
        </View>
      );
    }
}
