/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
} from 'react-native';

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

export default LoginContainer;
