/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { View, } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

class DetailPaymentScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            tokenXendit: '',
            item: props.navigation.getParam('item'),
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('tokenXendit')
            .then( res => this.setState({ tokenXendit: res}))

        Axios.get( `https://api.xendit.co/v2/invoices/${this.state.item.payment_id}`, {
            headers: {
                Authorization: this.state.tokenXendit
            }
        })
            .then(res => console.log(res))
    }

    render() {
        // console.log()
        return(
            <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                <View style={styles.containerView}>
                    <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>DetailPayments</Text>
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

export default DetailPaymentScreen