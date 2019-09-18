/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { View, Icon, Input, Item, Label  } from 'native-base'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            send: false
        }
    }

    handleForm = (type, value) => {
        let newFormData = {...this.state.form}
        newFormData[type] = value
        if ( value.length > 1 ) {
            this.setState({
                form: newFormData,
            })
            if ( type == 'password') {
                this.setState({
                    send: true
                })
            }
        }
        if ( value.length < 1 ) { this.setState({ send: false })}
    }

    submitForm = () => {
        Axios.post('http://192.168.100.36:1010/user/login/', this.state.form)
            .then( async (res) => {
                if (res.data.status === 200 && res.data.result[0].level == 'user' ){
                    await AsyncStorage.setItem('token', res.data.accessToken)
                    this.props.navigation.navigate('Home')
                } else if (res.data.status === 200 && res.data.result[0].level == 'mitra'){
                    console.warn('iki gawe akun user cok')
                } else if (res.data.status === 402){
                    console.warn('Password salah!')
                } else if (res.data.status === 401){
                    console.warn('user not found')
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 10  }} >
                    <Item stackedLabel last>
                        <Label style={{fontSize: 12, color: '#f9f9f9'}}>PASSWORD</Label>
                        <Input style={{color: '#f9f9f9'}} onChangeText={ value => this.handleForm('password', value) } />
                    </Item>
                    <TouchableOpacity>
                        <Text>Show</Text>
                    </TouchableOpacity>
                </View>
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