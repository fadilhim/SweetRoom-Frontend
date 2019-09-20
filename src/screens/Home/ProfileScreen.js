/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { View, Icon, Label, Body, Title } from 'native-base'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import DatePicker from 'react-native-datepicker'

class ProfileScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            profileData: {},
            editPhone: false,
            editAddress: false,
            date: '',
            form: {},
            token: ''
        }
    }
    async getuserData(){
        await AsyncStorage.getItem('token')
            .then( result => {
                this.setState({ token: result})
                Axios.get('http://192.168.100.36:1010/user/profile',{
                    headers: {
                        sweet_token: result
                    }
                })
                .then(res => this.setState({
                    profileData: res.data.data[0],
                    date: res.data.data[0].birth
                }))
            })
            .catch( err => console.warn(err))
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('token')
            .then(
                (result) => {
                    !result ? 
                        this.props.navigation.navigate('Login') : ''
                }
            )
        this.getuserData()
    }

    handleSubmit = (type, value) => {
        let newFormData = {...this.state.form}
        newFormData[type] = value
        this.setState({
            form: newFormData,
        })
    }

    editSub =() => {
        Axios.patch(`http://192.168.100.36:1010/user/${this.state.profileData.id}`,
        this.state.form
        ,{
            headers: {
                sweet_token: this.state.token
            }
        })
        .then( (res) => {
            this.setState({editPhone: false, editAddress: false})
        })
        .catch(err => console.log(err))
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Initial')
    }

    render() {
        this.getuserData()
        console.log(this.state.form)
        let profile = this.state.profileData
        let height = Math.round(Dimensions.get('window').height)
        return(
            <View style={{ height: height }}>
                <View style={styles.headContainer}>
                    <Image style={styles.avatar} source={{uri: 'https://www.pngkey.com/png/detail/193-1938385_-pikachu-avatar.png' }} />
                    <TouchableOpacity onPress={() => {this.changeImage('photo')} } style={styles.editPhotoIcon} activeOpacity={0.9} >
                        <Icon type='Entypo' name='camera' style={{ color: 'white', fontSize: 17}} />
                    </TouchableOpacity>
                    <Text style={styles.name}>Pikachu</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.realBody}>
                        <Label style={styles.aboutText}>About Me</Label>
                        <Label style={styles.label}>Birthday:</Label>
                        <DatePicker
                            style={{width: 150}}
                            mode="date"
                            date={this.state.date}
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            maxDate="2000-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    margin: 'auto',
                                    borderRadius: 5,
                                    borderWidth: 0,
                                    borderColor: '#fb8691',
                                    backgroundColor: '#fb8691',
                                },
                                dateText: {
                                    color: 'white',
                                },
                                placeholderText: {
                                    color: 'white',
                                },
                            }}
                            onDateChange={ date => {
                                this.setState({date: date})
                                this.handleSubmit('birth', date)
                            }}
                        />
                        <Label style={styles.label}>Phone:</Label>
                        {this.state.editPhone ?
                            <TextInput
                                underlineColorAndroid='#fb8691'
                                onChangeText={ (val) => this.handleSubmit('phone', val)}
                            />
                            :
                            <TouchableOpacity onLongPress={()=> {this.setState({editPhone: true})}}><Text>{profile.phone}</Text></TouchableOpacity>
                        }
                        <Label style={styles.label}>Address:</Label>
                        {this.state.editAddress ?
                        <TextInput
                            underlineColorAndroid='#fb8691'
                            onChangeText={ (val) => this.handleSubmit('address', val)}
                        />
                        :
                        <TouchableOpacity onLongPress={()=> {this.setState({editAddress: true})}}><Text>{profile.address}</Text></TouchableOpacity>
                        }
                    </View>
                    <TouchableOpacity onPress={ () => this.editSub()} style={styles.logout} >
                        <Text style = {{fontWeight:'bold'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this.logout()} style={styles.logout} >
                        <Text style = {{fontWeight:'bold'}}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headContainer:{
        alignItems: 'center',
        height: '50%',
        backgroundColor: '#52525220',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 80,
        borderWidth: 6,
        borderColor: '#52525220',
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:70
    },
    editPhotoIcon: { height: 30, width: 30, backgroundColor:'#525252', borderRadius: 50, justifyContent: "center", alignItems: 'center', position: 'absolute', left: 245, top: 178},
    name: { position: 'relative', top: 227, fontFamily: 'AirbnbCerealMedium', fontSize: 25, color: '#525252'},
    body: {height: '60%', backgroundColor: 'white', borderTopStartRadius: 30, borderTopEndRadius: 30, bottom: 70, paddingTop: 10, paddingLeft: 13, paddingRight: 13},
    realBody: {height: 250, width: '100%', borderRadius: 20, marginBottom: 8, paddingLeft:8, paddingTop:5, padding:20},
    aboutText: {fontWeight:'bold', fontSize:17, },
    logout: {height: 40, width: '30%', borderRadius: 5, backgroundColor: 'white', borderColor: '#fb8691', marginBottom: 8, alignItems:'center'},
    label: {fontWeight:'bold', fontSize:13, marginTop: 10},
})


export default ProfileScreen