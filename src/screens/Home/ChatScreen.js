/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, } from 'react-native'
import { View, } from 'native-base'

class ChatScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View>
                <Text>Chat</Text>
            </View>
        )
    }
}

export default ChatScreen