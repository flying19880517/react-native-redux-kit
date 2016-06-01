/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
} from 'react';

import { connect } from 'react-redux'
import Main from '../components/main';

class MainContainer extends Component {
    constructor (props) {
        super(props)
    }
    
    render() {
        return (
            <Main {...this.props} />
        );
    }
}

export default connect(state => ({
    userName:state.user.userName,
    userToken:state.user.userToken,
    userInfo:state.user.userInfo,
    connectionInfo:state.netInfo.connectionInfo,
    isConnectionExpensive:state.netInfo.isConnected,
    isConnected:state.netInfo.isConnected,
  })
)(MainContainer);
