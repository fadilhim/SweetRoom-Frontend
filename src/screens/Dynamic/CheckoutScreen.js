/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, ImageBackground, TouchableHighlight, StyleSheet, TextInput, Button } from 'react-native'
import { View, Icon, Label } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

class HotelScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            detail_room: props.navigation.getParam('item'),
            numm: 0,
            token: '',
            form: {
                num_people: 0,
                plan_checkin: '',
                plan_checkout: '',
                price: ''
            },
            dateIn: '',
            dateOut: '',
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('token')
            .then(
                (result) => {
                    !result ? 
                        this.props.navigation.navigate('Login') : ''
                }
            )
        await AsyncStorage.getItem('token')
                .then(res => [
                    this.setState({
                        token: res
                    })
                ])
    }

    onStarRatingPress = (rating) => {
        this.setState({
            starCount: rating
        });
    }

    minus = () => {
        if (this.state.numm > 0) {
            this.setState({
                numm: this.state.numm-1
            })
        }
    }

    plus = () => {
        if (this.state.detail_room.bed_type == 'big' && this.state.numm < 10) {
            this.setState({
                numm: this.state.numm + 1
            })
        } else if (this.state.detail_room.bed_type == 'medium' && this.state.numm < 6) {
            this.setState({
                numm: this.state.numm + 1
            })
        } else if (this.state.detail_room.bed_type == 'small' && this.state.numm < 3) {
            this.setState({
                numm: this.state.numm + 1
            })
        }
    }

    handleSubmit = (type, value) => {
        let newFormData = {...this.state.form}
        newFormData[type] = value
        newFormData.num_people = this.state.numm
        newFormData.room_id = this.state.detail_room.id
        newFormData.price = this.state.numm * this.state.detail_room.price
        this.setState({
            form: newFormData,
        })
    }

    checkOut = () => {
        Axios.post(`http://192.168.100.36:1010/reservation/insert/${this.state.detail_room.hotel_id}`,
                    this.state.form,{
                        headers: {
                            sweet_token: this.state.token
                        }
                    }
                )
            .then(res => {
                Axios.get(`http://192.168.100.36:1010/reservation/latest/a/`,{
                    headers: {
                        sweet_token: this.state.token
                    }
                }).then( res => {
                    console.log(res.data.data[0].id)
                    Axios.post(`http://192.168.100.36:1010/payments/${res.data.data[0].id}`,"",{
                        headers:{
                            sweet_token: this.state.token
                        }
                    })
                        .then( res => {
                            console.log(res)
                            this.props.navigation.navigate('History')
                        })
                        .catch(err => console.log('last', err))
                })
                .catch(err => console.log('habis get', err))
            })
            .catch( err => console.log('awal post', err))
    }

    render() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{ flex: 1, paddingTop: 15, }} >
                    <View style={styles.containerView}>
                        <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 20}}>Checkout</Text>
                        <View style={{height: 250, width: '100%', borderRadius: 20, marginBottom: 8, paddingLeft:8, paddingRight: 20}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                                <Label style={{fontWeight:'bold', fontSize:13, paddingTop:10,}}>Total People</Label>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <TouchableOpacity onPress={ () => this.minus()} style={styles.buttonPeople} >
                                        <Icon type='FontAwesome' name='minus' style={styles.buttonPeopleIcon} />
                                    </TouchableOpacity>
                                    <Text style={{marginLeft: 10, marginRight: 10}}>{this.state.numm}</Text>
                                    <TouchableOpacity onPress={ () => this.plus()} style={styles.buttonPeople} >
                                        <Icon type='FontAwesome' name='plus' style={styles.buttonPeopleIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Label style={{fontWeight:'bold', fontSize:13, marginBottom: 10}}>Check In</Label>
                                    <DatePicker
                                        style={{width: 150}}
                                        date={this.state.dateIn}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        minDate={date}
                                        maxDate="2020-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                margin: 'auto',
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: '#fb8691',
                                                backgroundColor: 'white',
                                            },
                                            dateText: {
                                                color: '#fb8691',
                                            },
                                            placeholderText: {
                                                color: '#fb8691',
                                            },
                                        }}
                                        onDateChange={ date => {
                                            this.handleSubmit('plan_checkin', date)
                                            this.setState({dateIn: date})
                                        }}
                                    />
                                </View>
                                <View>
                                    <Label style={{fontWeight:'bold', fontSize:13, marginBottom: 10}}>Check Out</Label>
                                    <DatePicker
                                        style={{width: 150}}
                                        date={this.state.dateOut}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        minDate={this.state.form.plan_checkin || date}
                                        maxDate="2020-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                margin: 'auto',
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: '#fb8691',
                                                backgroundColor: 'white',
                                            },
                                            dateText: {
                                                color: '#fb8691',
                                            },
                                            placeholderText: {
                                                color: '#fb8691',
                                            },
                                        }}
                                        onDateChange={ date => {
                                            this.handleSubmit('plan_checkout', date)
                                            this.setState({dateOut: date})
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={ () => this.checkOut() } style={styles.checkoutButton} activeOpacity={0.8} >
                        <Text style={{ color: '#fb8691', fontSize: 13, fontFamily: 'AirbnbCerealMedium'}}>Check Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        paddingLeft: 13,
        paddingRight: 13,
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor:'#fb8691',
        flexDirection:'row',
        height: 65,
        alignItems:'center',
        justifyContent: 'center',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    checkoutButton: {
        marginTop:10,
        height: 35,
        width: 170,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:5,
        backgroundColor: "white",
    },
    buttonPeople: {
        backgroundColor: 'white',
        borderColor: '#fb8691',
        borderWidth: 1,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonPeopleIcon: {
        color: '#fb8691',
        fontSize: 15
    }
})

export default HotelScreen