/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { View, Icon, Label, Body, Title } from 'native-base'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import { Header } from 'react-native-elements'

class ProfileScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            profileData: [],
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('token')
            .then(
                (result) => {
                    !result ? 
                        this.props.navigation.navigate('Login') : ''
                }
            )
        await AsyncStorage.getItem('token')
            .then( result => {
                Axios.get('http://192.168.100.36:1010/user/profile',{
                    headers: {
                        sweet_token: result
                    }
                })
            })
            .catch( err => console.warn(err))
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Initial')
    }

    render() {
        let height = Math.round(Dimensions.get('window').height)
        return(
            <View style={{ height: height }}>
                <View style={styles.headContainer}>
                    <Image style={styles.avatar} source={{uri: 'https://www.pngkey.com/png/detail/193-1938385_-pikachu-avatar.png' }} />
                    <TouchableOpacity onPress={() => {this.changeImage('photo')} } style={{ height: 30, width: 30, backgroundColor:'#525252', borderRadius: 50, justifyContent: "center", alignItems: 'center', position: 'absolute', left: 245, top: 178}} activeOpacity={0.9} >
                        <Icon type='Entypo' name='camera' style={{ color: 'white', fontSize: 17}} />
                    </TouchableOpacity>
                    <Text style={{ position: 'relative', top: 227, fontFamily: 'AirbnbCerealMedium', fontSize: 25, color: '#525252'}}>Pikachu</Text>
                </View>
                <View style={{height: '60%', backgroundColor: 'white', borderTopStartRadius: 30, borderTopEndRadius: 30, bottom: 70, paddingTop: 10, paddingLeft: 13, paddingRight: 13}}>
                    <View style={{height: 250, width: '100%', borderRadius: 20, marginBottom: 8, paddingLeft:8, paddingTop:5, padding:20}}>
                        <Label style={{fontWeight:'bold', fontSize:17}}>About Me</Label>
                        <Label style={{fontWeight:'bold', fontSize:13, paddingTop:10}}>Birthday:</Label>
                        <TextInput
                            underlineColorAndroid='grey'
                        />
                        <Label style={{fontWeight:'bold', fontSize:13}}>Phone:</Label>
                        <TextInput
                            underlineColorAndroid='grey'
                        />
                        <Label style={{fontWeight:'bold', fontSize:13}}>Address:</Label>
                        <TextInput
                            underlineColorAndroid='grey'
                        />
                    </View>
                    <TouchableOpacity onPress={ () => this.logout()} style={{height: 23, width: '30%', borderRadius: 20, backgroundColor: '#F8F8F8', marginBottom: 8, alignItems:'center'}} >
                        <Text style = {{fontWeight:'bold'}}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headContainer:{
        alignItems: 'center',
        height: '50%',
        backgroundColor: '#52525220',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 6,
        borderColor: '#52525220',
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:70
    },
})


export default ProfileScreen