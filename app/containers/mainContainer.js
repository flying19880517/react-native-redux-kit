/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  Component,
} from 'react-native';

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

export default MainContainer;
