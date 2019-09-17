/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

class InitScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View style={styles.viewStyles}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('HomeTab')}>
                    <Icon type= 'Entypo' name= 'cross' style={{color: '#f9f9f9'}} />
                </TouchableOpacity>
                <Text style={{color: '#f9f9f9', fontSize: 20, marginBottom: 50 }}>Welcome to SweetRoom.</Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')} style={{width: '100%', height: 45, justifyContent: "center", alignItems: 'center', borderColor: '#f9f9f9', borderWidth: 2, borderRadius: 40, marginBottom: 10}}>
                    <Text style={{color: '#f9f9f9', fontSize: 15, }} >Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('SignUp')} style={{width: '100%', height: 45, justifyContent: "center", alignItems: 'center', borderColor: '#f9f9f9', borderWidth: 2, borderRadius: 40, marginBottom: 100}}>
                    <Text style={{color: '#f9f9f9', fontSize: 15, }}>Create Account</Text>
                </TouchableOpacity>
                <Text style={{color: '#f9f9f9', fontSize: 12, textAlign: 'justify' }}>By tapping Continue, I agree to SweetRoom's Terms of Service, Payments Term of service, Privacy Policy, and Nondiscrimination Policy </Text>
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

export default InitScreen