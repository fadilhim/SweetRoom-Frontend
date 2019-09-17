/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

class HomeScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <View>
                <TouchableOpacity style={{width: '80%', height: 35, backgroundColor: 'grey', borderRadius: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} activeOpacity={0.95}>
                    <Icon type='AntDesign' name='search1' style={{ fontSize: 20, color: 'red'}} />
                    <Text>Search</Text>
                </TouchableOpacity>
                <Text>Discover</Text>
                <TouchableOpacity style={{ width: '80%', height: 400, backgroundColor: 'red', borderRadius: 15}}></TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Hotel')}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

export default HomeScreen;
