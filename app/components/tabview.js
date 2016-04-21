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
} from 'react-native';

import {Actions} from 'react-native-router-flux'

export default class TabView extends Component {
  constructor (props) {
    super(props)
  }
  
  onPress()
  {
    try{
      Actions.login();
    }catch(ex)
    {
      console.warn(ex);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.onPress.bind(this)}>
          跳转登录
        </Text>          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
