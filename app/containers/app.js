/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
} from 'react';

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Navigator,
  BackAndroid,
  Alert,
  ToastAndroid,
  Platform,
  NetInfo
} from 'react-native';

import {Scene, Reducer, Router, TabBar, Modal, Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Ionicons  from 'react-native-vector-icons/Ionicons'
import MainContainer from './mainContainer'
import LoginContainer from './loginContainer'
import UserCenterContainer from './userCenterContainer'
import Drawer from '../components/drawer'
import CommonStyles from '../styles/common'
import {Focus} from '../actions/routeActions'
import {ChangeNetInfo,ChangeNetExpensiveStatus,ChangeNetConnectStatus} from '../actions/netInfoActions';

class TabIcon extends Component {
  render(){
    var color = this.props.selected ? '#00a2ed' : '#aaa';
    return (
      <View style={[{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'},this.props.sceneStyle]}>
        <Ionicons style={{color: color}} name={this.props.iconName} size={24} />
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
      if(Platform.OS==='android')
      {
           BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      }
      NetInfo.addEventListener('change',this.handleConnectionInfoChange.bind(this));
      NetInfo.isConnected.addEventListener('change',this.handleConnectivityChange.bind(this));
      //获取网络当前信息
      NetInfo.fetch().done((connectionInfo) => {
          var info=this.switchConnectionInfo(connectionInfo);
          this.props.dispatch(ChangeNetInfo(info));
      });
      //获取网络当前连接状态
      NetInfo.isConnected.fetch().then((isConnected) => {
          this.props.dispatch(ChangeNetConnectStatus(isConnected));
      });
      //获取网络当前连接计费状态
      NetInfo.isConnectionExpensive().then((isConnectionExpensive) => {
          this.props.dispatch(ChangeNetExpensiveStatus(isConnectionExpensive));
      });
             
      Ionicons.getImageSource('ios-arrow-back', 30, '#fff').then((source) => this.setState({ backButtonImage: source }));
      Ionicons.getImageSource('md-menu', 30, '#fff').then((source) => this.setState({ drawerImage: source }));
  }

  componentWillUnmount() {
      if(Platform.OS==='android')
      {
          BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      }
      NetInfo.removeEventListener('change',this.handleConnectionInfoChange.bind(this));
      NetInfo.isConnected.removeEventListener('change',this.handleConnectivityChange.bind(this));      
  }

  onBackAndroid()
  {
       if(this.props.scene.sceneKey=='drawer'||this.props.scene.sceneKey=='main'||this.props.scene.sceneKey=='tab1'||this.props.scene.sceneKey=='tab2')
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
  
  handleConnectionInfoChange(connectionInfo)
  {
      var info=this.switchConnectionInfo(connectionInfo);
      this.props.dispatch(ChangeNetInfo(info));
      NetInfo.isConnectionExpensive().then((isConnectionExpensive) => {
          this.props.dispatch(ChangeNetExpensiveStatus(isConnectionExpensive));
      });
  }

  handleConnectivityChange(isConnected)
  {
      this.props.dispatch(ChangeNetConnectStatus(isConnected));
  }

  switchConnectionInfo(connectionInfo)
  {
      var netStatus='none';
      connectionInfo=connectionInfo.toLowerCase();
      switch (connectionInfo) {
      case 'wifi':          
          netStatus = 'wifi';
          break;
      case 'cell':           
      case 'mobile':
          netStatus = 'mobile';
          break;
      case 'unknown':           
          netStatus = 'unknown';
          break;                              
      default:
          netStatus = 'none';
          break;
      }
      return netStatus;
  }      
  
  render() {
      return (
        this.state.backButtonImage!=null&&this.state.drawerImage!=null?
        (<View style={CommonStyles.flex1}>
        <StatusBar backgroundColor="#00a2ed" barStyle="light-content"/>
        <Router createReducer={this.reducerCreate.bind(this)} getSceneStyle={getSceneStyle}>
            <Scene key="modal" component={Modal}>
                <Scene key="root" 
                    hideNavBar={true}
                    hideTabBar={true}
                    navigationBarStyle={CommonStyles.navBarStyle} 
                    titleStyle={CommonStyles.navTitleStyle}
                    backButtonImage={this.state.backButtonImage}
                    >
                    <Scene key="login" component={LoginContainer} title="登录" hideNavBar={false}/>
                    <Scene key="drawer" component={Platform.OS==='ios'?null:Drawer} initial={true} hideNavBar={true}>
                        <Scene key="main" tabs={true} default='tab1' hideNavBar={true}>
                            <Scene key="tab1"
                                component={MainContainer} 
                                title="首页"
                                getTitle={()=>'App'} 
                                initial={true}
                                navigationBarStyle={CommonStyles.navBarStyle} 
                                titleStyle={CommonStyles.navTitleStyle}
                                leftButtonIconStyle={CommonStyles.menuBarBtnIconStyle}
                                tabStyle={styles.bottomTabStyle}
                                drawerImage={this.state.drawerImage}          
                                icon={TabIcon}
                                iconName='md-home'/>
                            <Scene key="tab2" 
                                component={UserCenterContainer}
                                title="个人中心"
                                getTitle={()=>'App'}  
                                navigationBarStyle={CommonStyles.navBarStyle} 
                                titleStyle={CommonStyles.navTitleStyle} 
                                leftButtonIconStyle={CommonStyles.menuBarBtnIconStyle}
                                tabStyle={styles.bottomTabStyle}
                                drawerImage={this.state.drawerImage}
                                icon={TabIcon} 
                                iconName='md-person'/>
                        </Scene>
                    </Scene>
                </Scene>                    
            </Scene>
        </Router>
        </View>):null
      );   
  }
}

export default connect((state)=>({
        scene:state.routes.scene
    })
)(App);


// define this based on the styles/dimensions you use
const getSceneStyle = function (/* NavigationSceneRendererProps */ props, computedProps) {
  const style = {
    flex: 1,
    backgroundColor: '#FAFAFA',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : Platform.OS === 'ios' ? 64 : 44;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
}

const styles = StyleSheet.create({
    bottomTabStyle:{
        paddingBottom:2
    }
});