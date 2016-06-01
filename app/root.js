/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
} from 'react';

import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Storage from 'react-native-storage';

import App from './containers/app'

const store = configureStore();
global.storage=new Storage({size: 1000, defaultExpires:1000*3600*2,enableCache: false});
global.storage.sync ={
    userLoginInfo(params)
    {
        global.storage.save({
            key:'UserLoginInfo',
            rawData:{
                UserName:'',
                UserToken:'',
                UserInfo:null
            }
        });
    }
};

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}