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
  TouchableHighlight
} from 'react-native';

import CommonStyles from '../styles/common';

export default class LoadingView extends Component {
    constructor (props) {
      super(props)
    }
    
    render() {
      return (
          <View style={[CommonStyles.container,CommonStyles.vcenter,CommonStyles.hcenter]}>
               <Image style={{width:100,height:100}} source={ require('../images/offline_network.png')}/>
               <Text style={[CommonStyles.txtcenter,CommonStyles.font16,CommonStyles.marginTop10]}>没有可用的网络</Text> 
          </View>
      );
    }
}
