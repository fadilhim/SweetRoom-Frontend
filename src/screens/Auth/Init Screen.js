/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text } from 'react-native'
import { View } from 'native-base'

class InitScreen extends Component{
    constructor() {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View>
                <Text>Init Screen</Text>
            </View>
        )
    }
}

export default InitScreen