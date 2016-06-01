/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(thunkMiddleware),
            devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 5678
        })
    );
    return createStore(rootReducer, initialState, enhancer);
}