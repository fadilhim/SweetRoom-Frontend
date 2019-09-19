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
            },
        }
    }

    componentDidMount = async () => {
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
    }

    render() {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{ flex: 1, paddingTop: 15, }} >
                    <View style={styles.containerView}>
                        <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>Checkout</Text>
                        <View style={{height: 250, width: '100%', borderRadius: 20, marginBottom: 8, paddingLeft:8, paddingTop:5, padding:20}}>
                        <Label style={{fontWeight:'bold', fontSize:13, paddingTop:10}}>Total People</Label>
                        <TouchableOpacity onPress={ () => this.plus()}>
                            <Icon type='FontAwesome' name='plus' />
                        </TouchableOpacity>
                        <Text>{this.state.numm}</Text>
                        <TouchableOpacity onPress={ () => this.minus()}>
                            <Icon type='FontAwesome' name='minus' />
                        </TouchableOpacity>
                        <Label style={{fontWeight:'bold', fontSize:13}}>Check In</Label>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={date}
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                // dateIcon: {
                                //     position: 'absolute',
                                //     left: 0,
                                //     top: 4,
                                //     marginLeft: 0
                                // },
                                dateInput: {
                                    // margin: 'auto'
                                }
                            }}
                            onDateChange={ date => {
                                this.handleSubmit('plan_checkin', date)
                            }}
                        />
                        <Label style={{fontWeight:'bold', fontSize:13}}>Check Out</Label>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.form.plan_checkin || date}
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                // dateIcon: {
                                //     position: 'absolute',
                                //     left: 0,
                                //     top: 4,
                                //     marginLeft: 0
                                // },
                                dateInput: {
                                    // margin: 'auto'
                                }
                            }}
                            onDateChange={ date => this.handleSubmit('plan_checkout', date) }
                        />
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
// #fbda91
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
})

export default HotelScreen