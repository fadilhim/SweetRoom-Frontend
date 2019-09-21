/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native'
import { View, List, Left, Right, Icon, Content } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { ListItem } from 'react-native-elements'

class DetailPaymentScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            tokenXendit: '',
            token: '',
            item: props.navigation.getParam('item'),
            paymentBank: true,
            paymentRetail: false,
            payment: {}
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('tokenXendit')
            .then( res => this.setState({ tokenXendit: res}))

        await AsyncStorage.getItem('token')
            .then( res => this.setState({token: res}))

        Axios.get( `https://api.xendit.co/v2/invoices/${this.state.item.payment_id}`, {
            headers: {
                Authorization: this.state.tokenXendit
            }
        })
            .then(res => {
                console.log(res)
                if (res.data.status == "EXPIRED"){
                    Axios.post("https://sweetappbackend.herokuapp.com/reservation/makeStatusCancel",
                    res.data.external_id,{
                        headers: {
                            sweet_token: this.state.token
                        }
                    })
                        .then(res => {
                            this.props.navigation.navigate('Expired')
                        })
                        .catch(err => console.log(err))
                } else { console.log('error gan!')}
                this.setState({ payment: res })
            })
    }

    render() {
        let dataPayment = this.state.payment.data

        return(
                <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                    <View style={styles.containerView}>
                        <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 25, color: '#414141', marginBottom: 25}}>Select method payment</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <TouchableOpacity onPress={ () => this.setState({ paymentRetail: false, paymentBank: true})} style={ this.state.paymentBank ? styles.paymentButtonActive : styles.paymentButtonOff } activeOpacity={0.9} >
                                <Text>Transfer Bank</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => this.setState({ paymentRetail: true, paymentBank: false})} style={ this.state.paymentRetail ? styles.paymentButtonActive : styles.paymentButtonOff } activeOpacity={0.9} >
                                <Text>Outlet Retail</Text>
                            </TouchableOpacity>
                        </View>
                        { this.state.paymentBank ?
                            <View style={{ alignSelf: 'flex-start', width: '100%',}}>
                                <TouchableOpacity style={styles.bankContainer} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Payment', {item: dataPayment.available_banks[0]})}>
                                    <Image source={require('../../assets/mandiri.png')} style={{ width: 100, height: 70, resizeMode: 'contain'}} />
                                    <Icon name="arrow-forward" style={{paddingRight: 8, }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bankContainer} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Payment', {item: dataPayment.available_banks[1]})} >
                                    <Image source={require('../../assets/bri.png')} style={{ width: 100, height: 70, resizeMode: 'contain'}} />
                                    <Icon name="arrow-forward" style={{paddingRight: 8, }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bankContainer} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Payment', {item: dataPayment.available_banks[2]})} >
                                    <Image source={require('../../assets/bni.png')} style={{ width: 100, height: 70, resizeMode: 'contain'}} />
                                    <Icon name="arrow-forward" style={{paddingRight: 8, }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bankContainer} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Payment', {item: dataPayment.available_banks[3]})} >
                                    <Image source={require('../../assets/permata.png')} style={{ width: 100, height: 70, resizeMode: 'contain'}} />
                                    <Icon name="arrow-forward" style={{paddingRight: 8, }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bankContainer} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Payment', {item: dataPayment.available_banks[4]})} >
                                    <Image source={require('../../assets/bca.png')} style={{ width: 100, height: 70, resizeMode: 'contain'}} />
                                    <Icon name="arrow-forward" style={{paddingRight: 8, }} />
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ alignSelf: 'flex-start', width: '100%',}}>
                                <TouchableOpacity style={styles.bankContainer} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Payment', {retail: dataPayment.available_retail_outlets[0]})} >
                                    <Image source={require('../../assets/alfamart.jpg')} style={{ width: 100, height: 70, resizeMode: 'contain'}} />
                                    <Icon name="arrow-forward" style={{paddingRight: 8, }} />
                                </TouchableOpacity>
                            </View>
                        }
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
    paymentButtonActive: {backgroundColor: 'white', borderColor: '#fb8691', borderWidth: 2, height: 50, width: '48%', borderRadius: 5, justifyContent: 'center', alignItems: 'center'},
    paymentButtonOff: {backgroundColor: '#52525220', height: 50, width: '48%', borderRadius: 5, justifyContent: 'center', alignItems: 'center'},
    bankContainer: {flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey', alignItems: 'center',}
})

export default DetailPaymentScreen