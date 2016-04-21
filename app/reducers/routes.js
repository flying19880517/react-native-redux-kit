/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import * as types from '../actions/actionTypes';

const initialState = {
   scene:{}
};

export default function baodan(state=initialState, action={}) {
  switch (action.type) {
    case types.FOCUS_ACTION:
      return Object.assign({}, state, {
        scene:action.scene,
      });                                       
    default:
      return state;
  }
}