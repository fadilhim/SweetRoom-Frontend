/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { View, } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

class ChatScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                <View style={styles.containerView}>
                    <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>Chats</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        paddingLeft: 13,
        paddingRight: 13,
        alignItems: 'center',
    },
})

export default ChatScreen