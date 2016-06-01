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
  ProgressBarAndroid,
  ProgressViewIOS,
  Platform
} from 'react-native';

import CommonStyles from '../styles/common';

export default class LoadingView extends Component {
    constructor (props) {
      super(props)
    }
    
    render() {
      return (
          <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter]}>
              {Platform.OS==='ios'?<ProgressViewIOS progress={this.props.progress}/>:<ProgressBarAndroid progress={this.props.progress}/>}
              <Text style={[CommonStyles.font20,CommonStyles.marginTop10]}>{this.props.tip}</Text>
          </View>
      );
    }
}
