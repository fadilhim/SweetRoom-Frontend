/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, } from 'react-native'
import { View, } from 'native-base'

class SavedScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View>
                <Text>Saved</Text>
            </View>
        )
    }
}

export default SavedScreen