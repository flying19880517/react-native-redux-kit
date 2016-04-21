/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },
    hcenter:
    {
        alignItems:'center'
    },
    vcenter:
    {
        justifyContent:'center'
    },
    flexColumn:{
        flexDirection: 'column',
    },
    flexRow:{
        flexDirection: 'row',     
    }, 
    flex1:
    {
        flex:1
    },
    padding10:
    {
        padding:10
    },
    marginTop10:
    {
        marginTop:10
    },
    font16:{
        fontSize: 16,
    },
    font20:{
        fontSize: 20,
    },
    font24:{
        fontSize: 24,
    },
    navBarStyle:{
        height:50,
        backgroundColor:'#00a2ed'
    },
    navTitleStyle:{
        textAlign: "center",
        color:'#fff',
        fontSize:21,
        position: 'absolute',
        top:12,
        marginTop:0,
    },
    barBtnIconStyle:{
        width:21,
        height:16,
        marginTop:2
    }
});