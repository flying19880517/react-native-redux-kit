/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from '../actions/actionTypes';

const initialState = {
    connectionInfo:'none',
    isConnectionExpensive:false,
    isConnected:true
};

export default function netInfo(state=initialState, action={}) {
    switch (action.type) {
        case types.CHANGE_NETSTATUS:
            return Object.assign({}, state, {
                connectionInfo:action.connectionInfo,
                isConnectionExpensive:action.isConnectionExpensive,
                isConnected:action.isConnected
            });                                                                  
        default:
        return state;
    }
}