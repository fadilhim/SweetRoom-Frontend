/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text } from 'react-native'
import { View } from 'native-base'

class ExpiredScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View>
                <Text>Sorry this request is expired!</Text>
            </View>
        )
    }
}

export default ExpiredScreen