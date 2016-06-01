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
  ScrollView,
  Image,
  TextInput,
  ToolbarAndroid,
  TouchableHighlight,
  ProgressBarAndroid,
  Alert,
  ToastAndroid,
  Dimensions
} from 'react-native';

import md5 from 'md5'
import StringEx from '../utils/stringex'
import CommonStyles from '../styles/common';
import LoadingView from './loadingView';
import { SignIn,CleanAuthrizatuon} from '../actions/userActions';
import {Actions} from 'react-native-router-flux'

var interval=null;
export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state={
          userName:'',
          password:''
      };
    }
    
    componentWillMount() { 
        global.storage.load({ key:'UserLoginName',autoSync:false,syncInBackground:false}).then(ret => {
            var name=ret.UserName||'';
            if(name.length>0)
            {
                this.setState({userName:name});
            }
        }).catch( err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
        });      
    }
    
    onPressSignIn(){
        this.props.dispatch(CleanAuthrizatuon());
        var username=StringEx.trim(this.state.userName);
        var password = StringEx.trim(this.state.password);
        if(username.length==0||password.length==0){
            ToastAndroid.show('帐号密码不能为空',ToastAndroid.SHORT);
            return;
        }
        this.props.dispatch(SignIn(encodeURIComponent(username),md5(password).toLowerCase()));
        interval=setInterval(this.responseSignIn.bind(this),500);
    }
    
    responseSignIn(){
      if(!this.props.isLoading)
      {
          clearInterval(interval);
          if(this.props.userInfo!=null&&this.props.userName!=''&&this.props.userToken!='')
          {
              global.storage.save({
                  key:'UserLoginInfo',
                  rawData:{
                      UserName:this.props.userName,
                      UserToken:this.props.userToken,
                      UserInfo:this.props.userInfo
                  },
                  expires: 1000*3600*2
              });
              
              global.storage.save({
                  key:'UserLoginName',
                  rawData:{
                      UserName:this.props.userName
                  },
                  expires: null
              });
              
              if(this.props.loginResult.result)
              {
                  Actions.pop();
              }
              else
              {
                  Alert.alert('系统提示','登录失败！'+this.props.loginResult.msg);
              }
          }
          else
          {
              Alert.alert('系统提示','系统异常，请稍后尝试！');
          }
      }         
    }
    
    render() {
        if (this.props.isLoading)
        {
            return (<LoadingView progress={this.props.isLoading?0:1} tip='登录中...'/>);
        }
          
        return (
            <View style={CommonStyles.container}>
                <ScrollView contentContainerStyle={[CommonStyles.padding10,{alignItems:'center'}]}>
                    <Image
                        source={ require('../images/login_logo.png')}
                        style={styles.logo}/>
                    <TextInput
                        style={CommonStyles.input}
                        placeholder='用户名' onChangeText={(text) => this.setState({userName:text})} value={this.state.userName}/>
                    <TextInput
                        style={CommonStyles.input}
                        placeholder='密码'
                        password={true} onChangeText={(text) => this.setState({password:text})} value={this.state.password}/>

                    <TouchableHighlight
                        style={CommonStyles.button}
                        underlayColor='#87ceeb'
                        onPress={this.onPressSignIn.bind(this)}>
                        <Text style={[CommonStyles.buttonText,CommonStyles.font16]}>登  录</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={CommonStyles.button}
                        underlayColor='#87ceeb'
                        onPress={Actions.pop}>
                        <Text style={[CommonStyles.buttonText,CommonStyles.font16]}>返  回</Text>
                    </TouchableHighlight>                
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginTop:(Dimensions.get('window').width>450?0:100),
    marginBottom:10,
    opacity: 0.4,
    borderWidth:1
  }
});
