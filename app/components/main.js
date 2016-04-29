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

    render() {
      return (
        <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter,CommonStyles.marginNavTop]}>
            <ScrollableTabView style={{width:Dimensions.get('window').width}} renderTabBar={()=><DefaultTabBar underlineColor='#00a2ed' activeTextColor='#00a2ed' inactiveTextColor='#999'/>}>
                <ScrollTabView tabLabel="Tab1" {...this.props}/>
                <ScrollTabView tabLabel="Tab2" {...this.props}/>
                <ScrollTabView tabLabel="Tab3" {...this.props}/>
                <ScrollTabView tabLabel="Tab4" {...this.props}/>
            </ScrollableTabView>      
        </View>
      );
    }
}
