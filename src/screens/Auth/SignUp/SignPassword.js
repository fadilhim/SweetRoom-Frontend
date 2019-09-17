/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native'
import { View, Icon, Input, Label, Item } from 'native-base'

class SignPasswordScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            send: false,
            form : props.navigation.getParam('form')
        }
    }

    handlePassword = (type, value) => {
        let newFormData = {...this.state.form}
        newFormData[type] = value
        if ( value.length > 1 ) {
            this.setState({
                form: newFormData,
                send: true
            })
        }
        if ( value.length < 1 ) { this.setState({ send: false })}
    }

    render() {
        return(
            <View style={styles.viewStyles}>
                <TouchableOpacity onPress={ () => this.props.navigation.goBack(null)}>
                    <Icon type='Ionicons' name='md-arrow-round-back' style={{ color: '#f9f9f9' , fontSize: 30}} />
                </TouchableOpacity>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#f9f9f9', marginTop: 10, }} >Create a password</Text>
                <Text style={{ fontSize: 12, color: '#f9f9f9', marginBottom: 30 }} >Your password must include at least one symbol and be 8 or more characters long</Text>
                <Item stackedLabel>
                    <Label style={{fontSize: 12, color: '#f9f9f9'}}>PASSWORD</Label>
                    <Input style={{color: '#f9f9f9'}} onChangeText={ value => this.handlePassword('password', value) } />
                </Item>
                {this.state.send ?
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Birthday', { form: this.state.form })} style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}}>
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

export default SignPasswordScreen