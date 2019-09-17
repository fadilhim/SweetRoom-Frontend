/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { View, Icon, Input, Item, Label  } from 'native-base'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            send: false
        }
    }

    render() {
        return(
            <View style={styles.viewStyles}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Init')}>
                        <Icon type='Ionicons' name='md-arrow-round-back' style={{ color: '#f9f9f9' , fontSize: 30}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                        <Text style={{ color: '#f9f9f9', fontSize: 12, }} >Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#f9f9f9', marginTop: 10, marginBottom: 30 }} >Log in</Text>
                <Item stackedLabel>
                    <Label style={{fontSize: 12, color: '#f9f9f9'}}>EMAIL ADDRESS</Label>
                    <Input style={{color: '#f9f9f9'}} />
                </Item>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 10  }} >
                    <Item stackedLabel last>
                        <Label style={{fontSize: 12, color: '#f9f9f9'}}>PASSWORD</Label>
                        <Input />
                    </Item>
                    <TouchableOpacity>
                        <Text>Show</Text>
                    </TouchableOpacity>
                </View>
                {this.state.send ?
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('HomeTab')} style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}}>
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