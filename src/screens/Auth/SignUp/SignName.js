/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text, Icon, Input, Item, Label } from 'native-base'

class SignNameScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            send: true
        }
    }

    render() {
        return(
            <View style={styles.viewStyles}>
                <TouchableOpacity onPress={ () => this.props.navigation.goBack(null)}>
                    <Icon type='Ionicons' name='md-arrow-round-back' style={{ color: '#f9f9f9' , fontSize: 30}} />
                </TouchableOpacity>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#f9f9f9', marginTop: 10, marginBottom: 30 }} >What's your name?</Text>
                <Item stackedLabel>
                    <Label style={{fontSize: 12, color: '#f9f9f9'}}>FIRST NAME</Label>
                    <Input style={{color: '#f9f9f9'}} />
                </Item>
                <Item stackedLabel last >
                    <Label style={{fontSize: 12, color: '#f9f9f9'}}>LAST NAME</Label>
                    <Input style={{color: '#f9f9f9'}} />
                </Item>
                {this.state.send ?
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Email')} style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}}>
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

export default SignNameScreen