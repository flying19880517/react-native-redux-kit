/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from '../actions/actionTypes';

const initialState = {
    connectionInfo:'none',
    isConnectionExpensive:false,
    isConnected:false
};

export default function netInfo(state=initialState, action={}) {
    switch (action.type) {
        case types.CHANGE_NETINFO:
            return Object.assign({}, state, {
                connectionInfo:action.connectionInfo
            });
        case types.CHANGE_NETEXPENSIVE_STATUS:
            return Object.assign({}, state, {
                isConnectionExpensive:action.isConnectionExpensive
            });
        case types.CHANGE_NETCONNECT_STATUS:
            return Object.assign({}, state, {
                isConnected:action.isConnected
            });                                                                                          
        default:
        return state;
    }
}