/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, Dimensions, PermissionsAndroid } from 'react-native';
import { View, Icon, Label, Body, Title } from 'native-base';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

class ProfileScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Profile: {
                name: '',
                address: '',
                email: '',
                phone: '',
                },
            phone: '',
            profileData: {},
            editPhone: false,
            editAddress: false,
            date: '',
            form: {},
            isFocused: false,
            isLoading: false,
            token: '',
        };
    }
    getuserData = async () => {
        await AsyncStorage.getItem('token')
            .then( result => {
                this.setState({ token: result});
                Axios.get('https://sweetappbackend.herokuapp.com/user/profile',{
                    headers: {
                        sweet_token: result,
                    },
                })
                .then(res => this.setState({
                    profileData: res.data.data[0],
                    date: res.data.data[0].birth,
                }));
            })
            .catch( err => console.warn(err));
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('token')
            .then(
                (result) => {
                    !result ? 
                        this.props.navigation.navigate('Login') : '';
                }
            );
        this.getuserData();
    }

    handleSubmit = (type, value) => {
        let newFormData = {...this.state.form};
        newFormData[type] = value;
        this.setState({
            form: newFormData,
        });
    }
    
    handleChange = key => val => {
        this.setState({
        ...this.state,
        Profile: {[key]: val},
        });
    };
    handleFocus = () => {
        this.setState({
        isFocused: true,
        });
    };
    handleBlur = () => {
        this.setState({
        isFocused: false,
        });
        firebase
        .database()
        .ref('users/' + this.state.profileData.id)
        .update(this.state.Profile);
        
        Axios.patch(`https://sweetappbackend.herokuapp.com/user/${this.state.profileData.id}`,
        this.state.Profile
        ,{
            headers: {
                sweet_token: this.state.token,
            },
        })
        // .then( (res) => {
        //     this.setState({editPhone: false, editAddress: false})
        // })
        .catch(err => console.log(err));
    };

    editSub =() => {
        Axios.patch(`https://sweetappbackend.herokuapp.com/user/${this.state.profileData.id}`,
        this.state.form
        ,{
            headers: {
                sweet_token: this.state.token,
            },
        })
        .then( (res) => {
            this.setState({editPhone: false, editAddress: false});
        })
        .catch(err => console.log(err));
    }

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Initial');
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    changeImage = async () => {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
        };

        let cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) && PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE) && PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        if(!cameraPermission){
            cameraPermission = await this.requestCameraPermission();
        } else {
            ImagePicker.showImagePicker(options, (response)=> {
                let uploadBob = null;
                const imageRef = firebase.storage().ref('images/' + this.state.profileData.id).child('photo');
                fs.readFile(response.path, 'base64')
                    .then( (data) => {
                        console.log('1');
                        return Blob.build(data, { type: `${response.mime};BASE64`} );
                    })
                    .then( (blob) => {
                        console.log('2');
                        uploadBob = blob;
                        return imageRef.put(blob, { contentType: `${response.mime}`});
                    })
                    .then( () => {
                        console.log('3');
                        uploadBob.close();
                        return imageRef.getDownloadURL();
                    })
                    .then( (url) => {
                        console.log('4');
                        firebase.database().ref('users/' + this.state.profileData.id).update({ photo: url});
                        Axios.patch(`https://sweetappbackend.herokuapp.com/user/${this.state.profileData.id}`,
                            {photo: url},{
                                headers:{
                                    sweet_token: this.state.token
                                }
                            })
                            .then(res => console.log(res))
                            .catch(err => console.log(err));
                    })
                    .catch( (err) => console.log(err));
            });
        }
    }

    render() {
        // this.getuserData()
        // console.log(this.state.form)
        let profile = this.state.profileData;
        let height = Math.round(Dimensions.get('window').height);
        return(
            <View style={{ height: height }}>
                <View style={styles.headContainer}>
                    <Image style={styles.avatar} source={{uri: profile.photo }} />
                    <TouchableOpacity onPress={() => {this.changeImage();} } style={styles.editPhotoIcon} activeOpacity={0.9} >
                        <Icon type='Entypo' name='camera' style={{ color: 'white', fontSize: 17}} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{profile.first_name + ' ' + profile.last_name }</Text>
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
                                this.setState({date: date});
                                this.handleSubmit('birth', date);
                            }}
                        />
                        <Label style={styles.label}>Phone:</Label>
                        <TextInput
                            placeholder={profile.phone}
                            underlineColorAndroid='#fb8691'
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            value={this.state.Profile.phone || profile.phone}
                            onChangeText={this.handleChange('phone')}
                        />
                        <Label style={styles.label}>Address:</Label>
                        <TextInput
                            placeholder={profile.address}
                            underlineColorAndroid='#fb8691'
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            value={this.state.Profile.address || profile.address}
                            onChangeText={this.handleChange('address')}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity onPress={ () => this.editSub()} style={styles.logout} >
                            <Text style = {{fontWeight:'bold', color: 'white'}}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => this.logout()} style={styles.logout} >
                            <Text style = {{fontWeight:'bold', color: 'white'}}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
        marginTop:70,
    },
    editPhotoIcon: { height: 30, width: 30, backgroundColor:'#525252', borderRadius: 50, justifyContent: "center", alignItems: 'center', position: 'absolute', left: 245, top: 178},
    name: { position: 'relative', top: 227, fontFamily: 'AirbnbCerealMedium', fontSize: 25, color: '#525252'},
    body: {height: '60%', backgroundColor: 'white', borderTopStartRadius: 30, borderTopEndRadius: 30, bottom: 70, paddingTop: 10, paddingLeft: 13, paddingRight: 13},
    realBody: {height: 250, width: '100%', borderRadius: 20, marginBottom: 8, paddingLeft:8, paddingTop:5, padding:20},
    aboutText: {fontWeight:'bold', fontSize:17 },
    logout: {height: 40, width: '30%', borderRadius: 5, backgroundColor: '#fb8691', borderColor: '#fb8691', marginBottom: 8, alignItems:'center', justifyContent: 'center'},
    label: {fontWeight:'bold', fontSize:13, marginTop: 10},
});


export default ProfileScreen;