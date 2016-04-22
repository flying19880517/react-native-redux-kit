/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import {combineReducers} from 'redux';
import app from './app';
import routes from './routes';
import user from './user';
import netInfo from './netInfo';

const rootReducer = combineReducers({
    app,
    routes,
    user,
    netInfo
})

export default rootReducer;