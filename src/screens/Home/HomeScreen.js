/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    PermissionsAndroid
} from 'react-native'
import { Icon, } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import firebase from 'firebase'
import Geolocation from 'react-native-geolocation-service'

class HomeScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hotelList: [],
            love: false,
            city: [{
                id: 1,
                image: 'https://cdn2.tstatic.net/tribunnews/foto/bank/images/candi-borobudur-magelang-jawa-tengah.jpg',
                star: 4.5,
                city: 'Yogya',
                province: 'Yogyakarta',
            },{
                id: 2,
                image: 'https://www.suratkabar.id/wp-content/uploads/2016/08/Patung-Sby1.jpg',
                star: 5,
                city: 'Surabaya',
                province: 'East Java',
            },{
                id: 3,
                image: 'https://krjogja.com/kr-admin//files/news/image_1/36520/Tugu%20Monas.jpg',
                star: 4.8,
                city: 'Jakarta',
                province: 'Jakarta',
            },{
                id: 4,
                image: 'http://www.jurnalbandung.com/wp-content/uploads/2014/11/gedung-sate.jpg',
                star: 4.8,
                city: 'Bandung',
                province: 'West Java',
            },{
                id: 5,
                image: 'http://static.asiawebdirect.com/m/bangkok/portals/bali-indonesia-com/homepage/first-time-bali/pagePropertiesImage/bali-first-time.jpg.jpg',
                star: 5,
                city: 'Bali',
                province: 'Bali',
            }]
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('token')
        await AsyncStorage.setItem('tokenXendit', 'Basic eG5kX2RldmVsb3BtZW50XzY0S1hHd3hzYWJtVnVUbUxkYTZrNllQVFpiNWdtbmM4RG5VN0xQUnowZFdRTmhZekl1VnBqRFhHdmNscVc6')

        Axios.get('http://192.168.100.36:1010/hotel/data/4')
            .then(res => {
                this.setState({
                    hotelList: res.data.result.data
                })
            })

        let hasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (!hasLocationPermission) {
            hasLocationPermission = await this.requestLocationPermission()
        } else {
            Geolocation.watchPosition(
                (position) => {
                    firebase.database().ref('users/' + this.state.uid).update({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        lastSeen: position.timestamp
                    })
                },
                (error) => {
                    // See error code charts below.
                    console.warn(error.code, error.message);
                }, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    forceRequestLocation: true,
                    maximumAge: 10000,
                    distanceFilter: 1
                }
            )
        }
    }

    componentWillUnmount = () => {
        Geolocation.stopObserving()
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'SweetRoom Location Permission',
                    message: `SweetRoom needs permission to get your location`,
                    buttonNeutral: 'Ask Me Later',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED
        } catch (err) {
            console.warn(err);
            return false
        }
    }

    handleFav = () => {
        this.setState({ love: true})
        this.state.love === true ? console.warn('yyyyy') : console.warn('huuuu')
        this.forceUpdate()
    }

    _renderCity = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {turnCity: true, city: item.city})} style={styles.discoverCard} activeOpacity={0.95} >
                <ImageBackground style={styles.imageDisc} imageStyle={{ borderRadius: 20}} source={{uri: item.image}} blurRadius={0.4} >
                    <View style={{ alignContent: 'space-between', height: '100%'}}>
                        <View style={styles.starDiscCard}>
                            <Icon type='Ionicons' name='ios-star' style={{ fontSize: 15, color: '#ffffff', marginRight: 5}} />
                            <Text style={styles.starText}>{item.star}</Text>
                        </View>
                        <Text style={styles.discoverText}>{item.city},{'\n'}{item.province}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    _renderRow = ({item}) =>{
        return(
            <TouchableOpacity style={{width: '49%', height: 200, marginBottom: 10, marginRight: 5}} onPress={ () => this.props.navigation.navigate('Hotel', {data: item})} activeOpacity={0.8} >
                <Image style={{ width: '100%', height: 120}} source={{uri: item.image}} />
                <TouchableOpacity 
                    onPress={ () => this.handleFav()}
                    style={{height: 20, width: 20, position: 'absolute', right: 10, top: 10}}
                >
                    <Icon type='AntDesign' name={this.state.love === true ? 'heart' : 'hearto'} style={{ color: 'red', fontSize: 17,}} />
                </TouchableOpacity>
                <Text style={styles.textCityCard}>{item.city.toUpperCase()}</Text>
                <Text style={styles.textNameCard}>{item.hotel_name}</Text>
                <Text style={styles.textPriceCard}>Start from Rp {item.price.slice(0, -3)}K/night</Text>
                <View style={{ width: '30%',}}>
                    <StarRating
                        disabled={true}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={item.rate}
                        fullStarColor={'#fbda91'}
                        starSize={15}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                <View style={styles.containerView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} style={styles.searchButton} activeOpacity={0.95}>
                        <Icon type='AntDesign' name='search1' style={{ fontSize: 20, color: '#ffffff',}} />
                        <Text style={styles.searchText} >Search</Text>
                    </TouchableOpacity>
                    <Text style={styles.labelText}>Discover</Text>
                </View>
                <FlatList
                    data={this.state.city}
                    renderItem={this._renderCity}
                    keyExtractor={ (item) => item.id }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{maxHeight: 230}}
                />
                <View style={styles.containerView}>
                    <Text style={styles.labelText}>Introducing SweetRoom Max</Text>
                    <TouchableOpacity style={styles.maxCard} activeOpacity={0.9} onPress={() => this.props.navigation.navigate('SweetMax')} >
                        <Image style={styles.maxImage} source={{uri: 'https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/methode/2019/04/02/53edaba6-512b-11e9-8617-6babbcfb60eb_image_hires_105201.jpg?itok=Z9wEXJtF&v=1554173534'}} />
                        <Text style={styles.maxTextA}>Extraordinary rooms with five-star everything</Text>
                        <Text style={styles.maxTextB}>Explore SweetRoom Max ></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerView}>
                    <Text style={styles.labelText}>Places to stay around the world</Text>
                    <View style={styles.roomContainer}>
                        <FlatList 
                            data={this.state.hotelList}
                            renderItem={this._renderRow}
                            keyExtractor={ (item) => item.id }
                            numColumns={2}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {turn: true})} style={{height: 40, width: '50%', alignSelf: 'center', backgroundColor: '#52525220', borderRadius: 2, justifyContent:'center', alignItems: 'center'}} activeOpacity={0.9} >
                    <Text style={{color: '#fb8691', fontFamily: 'AirbnbCerealMedium'}}>Explore all rooms</Text>
                </TouchableOpacity>
                <View style={{height: 50}}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    labelText:{
        marginTop: 30,
        marginBottom: 13,
        color: '#414141',
        fontSize: 23,
        fontFamily: 'AirbnbCerealMedium'
    },
    containerView:{
        paddingLeft: 13,
        paddingRight: 13,
    },
    maxCard:{
        width: '100%',
        height: 280,
        backgroundColor: '#52525220',
    },
    textNameCard:{
        fontFamily: 'AirbnbCerealMedium',
        fontSize: 12,
        marginBottom: 2,
        color: '#414141',
    },
    textCityCard:{
        fontFamily: 'AirbnbCerealMedium',
        fontSize: 10,
        marginTop: 5,
        marginBottom: 2,
        color: '#414141',
    },
    textPriceCard:{
        fontFamily: 'AirbnbCerealMedium',
        fontSize: 10,
        marginBottom: 2,
        color: '#41414180',
    },
    searchButton: {
        width: '100%',
        height: 35,
        backgroundColor: '#fb8691',
        borderRadius: 15,
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    searchText: { 
        fontFamily: 'AirbnbCerealMedium', 
        color: '#ffffff', 
        marginLeft: 10
    },
    discoverCard: { width: 220, height: 230, marginStart: 13, marginRight: 5},
    starDiscCard: {flexDirection: 'row', backgroundColor: '#ffffff50', width: 50, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 15, top: 25 },
    starText: {color: '#ffffff', fontFamily: 'AirbnbCerealMedium', },
    discoverText: { color: '#ffffff', fontSize: 20, fontFamily: 'AirbnbCerealMedium', position: 'absolute', bottom: 25, left: 15},
    imageDisc: {width: '100%', height: 230, },
    maxImage: {width: '100%', height: 190},
    maxTextA: {fontFamily: 'AirbnbCerealMedium', color: '#414141', fontWeight: '100', fontSize: 15, paddingTop: 20, paddingLeft: 15, paddingRight: 15},
    maxTextB: {fontFamily: 'AirbnbCerealMedium', color: '#fb8691', fontWeight: '100', fontSize: 13, paddingTop: 20, paddingLeft: 15, paddingRight: 15},
    roomContainer: { width: '100%', height: 408, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
})

export default HomeScreen;
