/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, Image } from 'react-native'
import { View, Button } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

class ExpiredScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View>
                <ScrollView>
                    <Text style={{ fontSize: 30, margin: 25, fontWeight: 'bold' }}>Your Payment Has Expire</Text>
                <View>
                    <Image source={require('../../assets/expire.png')} style={{ width: '100%', resizeMode: 'contain'}}/>
                </View>
                <Button style={{ backgroundColor: '#fb8691' }} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={{ color: 'white', fontSize: 25, marginHorizontal: 80 }}>Return To Home</Text>
                </Button>
                </ScrollView>
            </View>
        )
    }
}

export default ExpiredScreen