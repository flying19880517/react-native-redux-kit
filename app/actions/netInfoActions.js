/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from './actionTypes';

export function ChangeNetInfo(connectionInfo) {
    return {type: types.CHANGE_NETSTATUS, connectionInfo};
}

export function ChangeNetExpensiveStatus(isConnectionExpensive,isConnected) {
    return {type: types.CHANGE_NETEXPENSIVE_STATUS, isConnectionExpensive};
}

export function ChangeNetConnectStatus(isConnected) {
    return {type: types.CHANGE_NETCONNECT_STATUS, isConnected};
}


