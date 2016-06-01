/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import {Actions} from 'react-native-router-flux'
import CommonStyles from '../styles/common';

export default class TabView extends Component {
    constructor (props) {
      super(props)
    }
    
    render() {
      return (
        <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter]}>
          <Text style={[CommonStyles.txtcenter,CommonStyles.font20]}>
              {this.props.userName}
          </Text>
          <Text style={[CommonStyles.txtcenter,CommonStyles.font20]}>
              {this.props.userToken}
          </Text>
          <Text style={[CommonStyles.txtcenter,CommonStyles.font20]}>
              {this.props.userInfo==null?'':this.props.userInfo.realname}
          </Text>                                   
          <Text style={[CommonStyles.txtcenter,CommonStyles.font20,{color:'#0000ee'}]} onPress={Actions.login}>
              跳转登录
          </Text>          
        </View>
      );
    }
}
