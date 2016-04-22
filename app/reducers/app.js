/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from '../actions/actionTypes';

const initialState = {
   isLoading:false
};

export default function app(state=initialState, action={}) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
        return Object.assign({}, state, {
            isLoading:true,
        }); 
    case types.RECEIVE_LOGIN:
        return Object.assign({}, state, {
            isLoading:false,
        });                                            
    default:
      return state;
  }
}