/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
    PropTypes
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  DrawerLayoutAndroid,
} from 'react-native';

import { connect } from 'react-redux';
import {DefaultRenderer} from "react-native-router-flux";

class Drawer extends Component {
    constructor (props) {
      super(props);
      this.state={
        isOpen:false
      };
    }
    
    getChildContext() {
      return { drawer: this }
    }
    
    componentWillMount()
    {
      this.setState({ isOpen: false });
    }
    
    toggle = () => {
      this.state.isOpen ? this.refs.navigation.closeDrawer() : this.refs.navigation.openDrawer();
    };

    render() {
      const children = this.props.navigationState.children;
      //console.warn(JSON.stringify(children));
      var navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        </View>
      );
      return (
        <DrawerLayoutAndroid
          ref="navigation"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
          onDrawerOpen={()=>{this.setState({ isOpen: true });}}
          onDrawerClose={()=>{this.setState({ isOpen: false });}}>
          <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
        </DrawerLayoutAndroid>
      );
    }
}

Drawer.contextTypes = {
  drawer: PropTypes.object,
};

Drawer.childContextTypes = {
  drawer: PropTypes.object,
};

export default Drawer;
