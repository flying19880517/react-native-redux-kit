/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  View,
  Text,
  StatusBar,
  Component,
  Navigator,
  BackAndroid,
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';

import {Scene, Reducer, Router, TabBar, Modal, Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
var Ionicons = require('react-native-vector-icons/Ionicons')
import MainContainer from './mainContainer'
import LoginContainer from './loginContainer'
import TabView from '../components/tabview'
import Drawer from '../components/drawer'
import CommonStyles from '../styles/common'
import {Focus} from '../actions/routeActions'

class TabIcon extends Component {
  render(){
    var color = this.props.selected ? '#00a2ed' : '#aaa';
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
        <Ionicons style={{color: color}} name={this.props.iconName} size={30} />
        <Text style={{color: color}}>{this.props.title}</Text>
      </View>
      );
  }
}

class App extends Component {        
  constructor(props) {
    super(props);
    this.state={
          drawerImage:null,
          backButtonImage:null
    };
  }
  
  reducerCreate(params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      //console.warn(JSON.stringify(action));
      if (action.type === 'focus') {
        this.props.dispatch(Focus(action.scene))
      }      
      return defaultReducer(state, action);
    };
  }  
  
  componentWillMount()
  {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      
      Ionicons.getImageSource('ios-arrow-back', 30, '#fff').then((source) => this.setState({ backButtonImage: source }));
      Ionicons.getImageSource('android-menu', 30, '#fff').then((source) => this.setState({ drawerImage: source }));
  }

  componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid()
  {
       if(this.props.scene.sceneKey=='tabmain'||this.props.scene.sceneKey=='tabbar')
       {
            var datenow=Date.now();
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= datenow) {
                return false;
            }
            this.lastBackPressed = datenow;
            ToastAndroid.show('再次点击退出应用',ToastAndroid.SHORT);
            return true;            
       }
       else
       {
           Actions.pop();
           return true;
       }
  }    
  
  render() {
      const scenesData = Actions.create(
        <Scene key="modal" component={Modal}>
            <Scene key="root"      
                navigationBarStyle={CommonStyles.navBarStyle}
                titleStyle={CommonStyles.navTitleStyle}
                barButtonIconStyle={CommonStyles.barBtnIconStyle}
                backButtonImage={this.state.backButtonImage}
                hideNavBar={false}>
                <Scene key="login" component={LoginContainer} title="登录" />
                <Scene key="tabbar" component={Platform.OS==='ios'?null:Drawer} title='App'  initial={true} hideNavBar={true}>
                    <Scene key="tabmain" tabs={true} default='tab1'>
                        <Scene key="tab1"
                            component={MainContainer} 
                            title="首页" 
                            initial={true}
                            navigationBarStyle={CommonStyles.navBarStyle} 
                            titleStyle={CommonStyles.navTitleStyle} 
                            barButtonIconStyle={CommonStyles.menuBarBtnIconStyle}
                            drawerImage={this.state.drawerImage}                             
                            icon={TabIcon} 
                            iconName='android-home'/>
                        <Scene key="tab2" 
                            component={TabView} 
                            title="个人中心" 
                            navigationBarStyle={CommonStyles.navBarStyle} 
                            titleStyle={CommonStyles.navTitleStyle} 
                            barButtonIconStyle={CommonStyles.menuBarBtnIconStyle}
                            drawerImage={this.state.drawerImage}
                            icon={TabIcon} 
                            iconName='android-person'/>
                    </Scene>
                </Scene>
            </Scene>                    
        </Scene>          
      );
      return (
        this.state.backButtonImage!=null&&this.state.drawerImage!=null?
        (<View style={CommonStyles.flex1}>
        <StatusBar backgroundColor="#00a2ed" barStyle="light-content"/>
        <Router createReducer={this.reducerCreate.bind(this)} scenes={scenesData}/>
        </View>):null
      );   
  }
}

export default connect((state)=>({
        scene:state.routes.scene
    })
)(App);