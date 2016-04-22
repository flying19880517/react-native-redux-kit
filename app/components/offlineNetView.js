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
               <Image source={ require('../images/offline_network.png')}/>
          </View>
      );
    }
}
