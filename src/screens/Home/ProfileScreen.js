/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { View, Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

class ProfileScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Initial')
    }

    render() {
        return(
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.headContainer}>
                    {/* <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>Chats</Text> */}
                    <Image style={styles.avatar} source={{uri: 'https://www.pngkey.com/png/detail/193-1938385_-pikachu-avatar.png' }} />
                    <TouchableOpacity onPress={() => {this.changeImage('photo')} } style={{ height: 30, width: 30, backgroundColor:'#00000030', borderRadius: 50, justifyContent: "center", alignItems: 'center', position: 'absolute', left: 245, top: 178}} activeOpacity={0.9} >
                        <Icon type='Entypo' name='camera' style={{ color: 'white', fontSize: 17}} />
                    </TouchableOpacity>
                    <Text style={{ position: 'relative', top: 227, fontFamily: 'AirbnbCerealMedium', fontSize: 25}}>Pikachu</Text>
                </View>
                <TouchableOpacity onPress={ () => this.logout()} >
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headContainer:{
        alignItems: 'center',
        height: 300,
        backgroundColor: 'red',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 4,
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:70
    },
})


export default ProfileScreen