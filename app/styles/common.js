/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import { StyleSheet,Platform} from 'react-native';

export default  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },
    hcenter:
    {
        justifyContent:'center'
    },
    vcenter:
    {
        alignItems:'center'
    },
    txtcenter:
    {
        textAlign:'center'
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
    marginNavTop:
    {
        marginTop:Platform.OS === 'ios' ? 64 : 44
    },
    navBarStyle:{
        height:Platform.OS === 'ios' ? 64 : 44,
        backgroundColor:'#00a2ed'
    },
    navTitleStyle:{
        textAlign: "center",
        color:'#fff',
        fontSize:20,
        position: 'absolute',
        top:8,
        marginTop:0,
    },
    navLeftButtonStyle:{
        position: 'absolute',
        top:Platform.OS === 'ios' ? 17 : 5,
    },
    barBtnIconStyle:{
        width:12,
        height:20,
    },
    menuBarBtnIconStyle:
    {
        width:20,
        height:14,
    },
    button:{
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00a2ed',
        height: 40,
        borderRadius: 5,
        marginTop: 15
    },
    buttonText:{
        fontWeight: 'bold',
        color: '#FFF',
    },
    input: {
        height: 50,
        fontSize:18
    }
});