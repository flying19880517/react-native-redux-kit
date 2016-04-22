/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from '../actions/actionTypes';

const initialState = {
   userName:'',
   userToken:'',
   userInfo:null,
   loginResult:null
};

export default function user(state=initialState, action={}) {
    switch (action.type) {
        case types.RECEIVE_LOGIN:
            return Object.assign({}, state, {
                userName:action.userName,
                userToken:action.userToken,
                userInfo:action.loginResult.userinfo,
                loginResult:action.loginResult
            });
        case types.SET_AUTHRIZATION:
            return Object.assign({}, state, {
                userName:action.userName,
                userToken:action.userToken,
                userInfo:action.userInfo
            });
        case types.CLEAN_AUTHRIZATION:
            return Object.assign({}, state, {
                userName:'',
                userToken:'',
                userInfo:null
            });                                                                  
        default:
        return state;
    }
}