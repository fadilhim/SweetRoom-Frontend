/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { View, Icon, Input, Item, Label  } from 'native-base'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            send: false,
            errorMitra: false,
            errorUserNotFound: false,
            errorWrongPass: false,
        }
    }

    emailRegex = (email) => {
        //One or more after '@' and minimum domain 2 character
        let emailRegex = /^[\d\w\._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    handleForm = (type, value) => {
        this.setState({
            errorMitra: false,
            errorUserNotFound: false,
            errorWrongPass: false,
        })
        let newFormData = {...this.state.form}
        newFormData[type] = value
        let pass = newFormData.password || 0
        if ( this.emailRegex(newFormData.email ) || pass.length > 0 ) {
            this.setState({
                form: newFormData,
            })
        if ( this.emailRegex(newFormData.email) && pass.length > 0) {
            this.setState({
                send: true
            })
        }
        }
        if ( !this.emailRegex(newFormData.email) || pass.length < 1) { this.setState({ send: false })}
    }

    submitForm = () => {
        Axios.post('https://sweetappbackend.herokuapp.com/user/login/', this.state.form)
            .then( async (res) => {
                if (res.data.status === 200 && res.data.result[0].level == 'user' ){
                    await AsyncStorage.setItem('token', res.data.accessToken)
                    await AsyncStorage.setItem('dataUser', JSON.stringify(res.data.result[0]))
                    firebase.database().ref('users/'+ res.data.result[0].id).set(
                        res.data.result[0]
                    )
                    this.props.navigation.navigate('Home')
                } else if (res.data.status === 200 && res.data.result[0].level == 'mitra'){
                    this.setState({ errorMitra: true})
                } else if (res.data.status === 402){
                    this.setState({ errorWrongPass: true})
                } else if (res.data.status === 401){
                    this.setState({ errorUserNotFound: true})
                }
            })
            .catch(err => console.warn(err))
    }

    render() {
        return(
            <View style={styles.viewStyles}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <TouchableOpacity onPress={ () => this.props.navigation.goBack(null)}>
                        <Icon type='Ionicons' name='md-arrow-round-back' style={{ color: '#f9f9f9' , fontSize: 30}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                        <Text style={{ color: '#f9f9f9', fontSize: 12, }} >Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#f9f9f9', marginTop: 10, marginBottom: 30 }} >Log in</Text>
                <Item stackedLabel>
                    <Label style={{fontSize: 12, color: '#f9f9f9'}}>EMAIL ADDRESS</Label>
                    <Input style={{color: '#f9f9f9'}} onChangeText={ value => this.handleForm('email', value) } />
                </Item>
                <Item stackedLabel last>
                    <Label style={{fontSize: 12, color: '#f9f9f9'}}>PASSWORD</Label>
                    <Input style={{color: '#f9f9f9'}} onChangeText={ value => this.handleForm('password', value) } secureTextEntry={true} />
                </Item>
                {this.state.errorMitra ?
                    <Text style={{ fontSize: 17, color: '#fbda91', marginTop: 10, marginBottom: 30 }} >Sorry you must login with User account</Text>
                    :
                this.state.errorUserNotFound ?
                    <Text style={{ fontSize: 17, color: '#fbda91', marginTop: 10, marginBottom: 30 }} >User not found! Please register first!</Text>
                    :
                this.state.errorWrongPass ?
                    <Text style={{ fontSize: 17, color: '#fbda91', marginTop: 10, marginBottom: 30 }} >Wrong password or email! Please remember that password must contain at least uppercase, lowercase and 8 or more character long!</Text>
                    :
                    <Text> </Text>
                }
                {this.state.send ?
                    <TouchableOpacity onPress={ () => this.submitForm()} style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}}>
                        <Icon type='Ionicons' name='ios-arrow-forward' style={{ color: '#fb8691'}} />
                    </TouchableOpacity>
                    :
                    <View style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f950', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}} >
                        <Icon type='Ionicons' name='ios-arrow-forward' style={{ color: '#fb8691'}} />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        backgroundColor: '#fb8691',
        fontFamily: 'AirbnbCerealMedium',
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15
    },
})
export default LoginScreen