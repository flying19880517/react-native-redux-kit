/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    Component,
} from 'react';

import { connect } from 'react-redux'
import UserCenter from '../components/userCenter'

class UserCenterContainer extends Component {
    constructor (props) {
        super(props)
    }
    
    render() {
        return (
            <UserCenter {...this.props} />
        );
    }
}

export default connect(state => ({
    userName:state.user.userName,
    userToken:state.user.userToken,
    userInfo:state.user.userInfo,
  })
)(UserCenterContainer);
