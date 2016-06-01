/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
} from 'react';

import { connect } from 'react-redux'
import Login from '../components/login';

class LoginContainer extends Component {
    constructor (props) {
        super(props)
    }
    
    render() {
        return (
            <Login {...this.props} />
        );
    }
}

export default connect(state => ({
    isLoading:state.app.isLoading,
    userName:state.user.userName,
    userToken:state.user.userToken,
    userInfo:state.user.userInfo,
    loginResult:state.user.loginResult
  })
)(LoginContainer);
