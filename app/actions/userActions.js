/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from './actionTypes';

function requestLogin() {
    return {
      type: types.REQUEST_LOGIN
    };
}

function receiveLogin(userName,userToken,loginResult) {
    return {
      type: types.RECEIVE_LOGIN,
      userName,
      userToken,
      loginResult
    };
}

export function SignIn(username,password)
{
    return dispatch => {
        dispatch(requestLogin());
        return  setTimeout(function() {
            return dispatch(receiveLogin(username,(Math.random()).toString(),{result:true,msg:'登录成功',userinfo:{userid:1,realname:'路人甲'}}));
        }, 2000);
    } 
}

export function SignOut() {
    return {
      type: types.REQUEST_LOGOUT
    };
}

export function SetAuthrizatuon(userName,userToken,userInfo) {
   return {
    type: types.SET_AUTHRIZATION,
    userName,
    userToken,
    userInfo
  };
}

export function CleanAuthrizatuon() {
   global.storage.remove({key:'UserLoginInfo'});
   return {
    type: types.CLEAN_AUTHRIZATION
  };
}


