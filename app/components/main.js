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
  NetInfo
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import CommonStyles from '../styles/common';
import {SetAuthrizatuon } from '../actions/userActions';
import {ChangeNetInfo,ChangeNetExpensiveStatus,ChangeNetConnectStatus} from '../actions/netInfoActions';

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
        NetInfo.addEventListener('change',this.handleConnectionInfoChange.bind(this));              
    }
    
    componentWillUnmount()
    {
        NetInfo.removeEventListener('change',this.handleConnectionInfoChange.bind(this));
    }
    
    handleConnectionInfoChange(connectionInfo)
    {
        var netStatus='none';
        switch (connectionInfo) {
          case 'wifi':
          case 'WIFI':
            netStatus = 'wifi';
            break;
          case 'cell':
          case 'MOBILE':
            netStatus = 'mobile';
            break;
          case 'unknown':
          case 'UNKNOWN':
            netStatus = 'unknown';
            break;                              
          default:
            netStatus = 'none';
            break;
        }
        this.props.dispatch(ChangeNetInfo(netStatus));
    }    

    render() {
      return (
        <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter]}>
          <Text style={[CommonStyles.txtcenter,CommonStyles.font20]}>
            首页
          </Text>      
        </View>
      );
    }
}
