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
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import CommonStyles from '../styles/common';
import OfflineNetView from './offlineNetView';

export default class ScrollTabView extends Component {
    constructor (props) {
      super(props)
    }
    
    render() {
      if(!this.props.isConnected)
      {
          return <OfflineNetView/>
      }
      return (
        <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter]}>
          <Text style={[CommonStyles.font20]}>
              {this.props.tabLabel}
          </Text>         
        </View>
      );
    }
}
