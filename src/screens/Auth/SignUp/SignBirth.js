/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { View, Icon, Input, Label, Item } from 'native-base'
import DatePicker from 'react-native-datepicker'

class SignPasswordScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            send: false,
            form : props.navigation.getParam('form')
        }
    }

    handleBirthday = (type, value) => {
        let newFormData = {...this.state.form}
        newFormData[type] = value
        if ( value.length > 1 ) {
            this.setState({
                form: newFormData,
                send: true
            })
        }
        if ( value.length < 1 ) { this.setState({ send: false })}
    }

    handleSubmit = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        console.warn(this.state.form)
        return(
            <View style={styles.viewStyles}>
                <TouchableOpacity onPress={ () => this.props.navigation.goBack(null)}>
                    <Icon type='Ionicons' name='md-arrow-round-back' style={{ color: '#f9f9f9' , fontSize: 30}} />
                </TouchableOpacity>
                <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#f9f9f9', marginTop: 10, }} >When is your birthday?</Text>
                <Text style={{ fontSize: 12,color: '#f9f9f9', marginBottom: 30 }} >You need to be at least 18. Othe people who use SweetRoom won't see your birthday</Text>
                <Label style={{fontSize: 12, color: '#f9f9f9'}}>BIRTHDAY</Label>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
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
                    onDateChange={ date => this.handleBirthday('birth', date) }
                />
                {this.state.send ?
                    <TouchableOpacity onPress={ () => this.handleSubmit() } style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}}>
                        <Icon type='Ionicons' name='ios-arrow-forward' style={{ color: '#fb8691'}} />
                    </TouchableOpacity>
                    :
                    <View style={{width: 50, height: 50, justifyContent: "center", alignItems: 'center', backgroundColor: '#f9f9f950', borderRadius: 40, position: 'absolute', right: 15, bottom: 30}} >
                        <Icon type='Ionicons' name='ios-arrow-forward' style={{ color: '#fb8691'}} />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        backgroundColor: '#fb8691',
        fontFamily: 'AirbnbCerealMedium',
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15
    },
})

export default SignPasswordScreen