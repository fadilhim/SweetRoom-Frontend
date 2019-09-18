/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { Icon, } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'

class HomeScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hotelList: [],
            love: false,
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('token')

        Axios.get('http://192.168.100.9:1010/hotel')
            .then(res => {
                this.setState({
                    hotelList: res.data.result.data
                })
            })
    }

    handleFav = () => {
        this.setState({ love: true})
        this.state.love === true ? console.warn('yyyyy') : console.warn('huuuu')
        this.forceUpdate()
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
                <Text style={styles.textPriceCard}>Rp 200K/night</Text>
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
                    <TouchableOpacity style={{width: '100%', height: 35, backgroundColor: '#52525280', borderRadius: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} activeOpacity={0.95}>
                        <Icon type='AntDesign' name='search1' style={{ fontSize: 20, color: '#ffffff',}} />
                        <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#ffffff', marginLeft: 10}} >Search</Text>
                    </TouchableOpacity>
                    <Text style={styles.labelText}>Discover</Text>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{maxHeight: 230}}
                >
                    <TouchableOpacity style={{ width: 220, height: 230, marginStart: 13, marginRight: 5}} activeOpacity={0.95} >
                        <ImageBackground style={{width: '100%', height: 230, }} imageStyle={{ borderRadius: 20}} source={{uri: 'https://cdn2.tstatic.net/tribunnews/foto/bank/images/candi-borobudur-magelang-jawa-tengah.jpg'}} blurRadius={0.4} >
                            <View style={{ alignContent: 'space-between', height: '100%'}}>
                                <View style={{flexDirection: 'row', backgroundColor: '#ffffff50', width: 50, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 15, top: 25 }}>
                                    <Icon type='Ionicons' name='ios-star' style={{ fontSize: 15, color: '#ffffff', marginRight: 5}} />
                                    <Text style={{color: '#ffffff', fontFamily: 'AirbnbCerealMedium', }}>4.5</Text>
                                </View>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'AirbnbCerealMedium', position: 'absolute', bottom: 25, left: 15}}>Semarang,{'\n'}Central Java</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 220, height: 230, marginRight: 5}} activeOpacity={0.95} >
                        <ImageBackground style={{width: '100%', height: 230, }} imageStyle={{ borderRadius: 20}} source={{uri: 'https://cdn2.tstatic.net/tribunnews/foto/bank/images/candi-borobudur-magelang-jawa-tengah.jpg'}} blurRadius={0.4} >
                            <View style={{ alignContent: 'space-between', height: '100%'}}>
                                <View style={{flexDirection: 'row', backgroundColor: '#ffffff50', width: 50, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 15, top: 25 }}>
                                    <Icon type='Ionicons' name='ios-star' style={{ fontSize: 15, color: '#ffffff', marginRight: 5}} />
                                    <Text style={{color: '#ffffff', fontFamily: 'AirbnbCerealMedium', }}>4.5</Text>
                                </View>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'AirbnbCerealMedium', position: 'absolute', bottom: 25, left: 15}}>Semarang,{'\n'}Central Java</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 220, height: 230, marginRight: 5}} activeOpacity={0.95} >
                        <ImageBackground style={{width: '100%', height: 230, }} imageStyle={{ borderRadius: 20}} source={{uri: 'https://cdn2.tstatic.net/tribunnews/foto/bank/images/candi-borobudur-magelang-jawa-tengah.jpg'}} blurRadius={0.4} >
                            <View style={{ alignContent: 'space-between', height: '100%'}}>
                                <View style={{flexDirection: 'row', backgroundColor: '#ffffff50', width: 50, height: 27, borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 15, top: 25 }}>
                                    <Icon type='Ionicons' name='ios-star' style={{ fontSize: 15, color: '#ffffff', marginRight: 5}} />
                                    <Text style={{color: '#ffffff', fontFamily: 'AirbnbCerealMedium', }}>4.5</Text>
                                </View>
                                <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'AirbnbCerealMedium', position: 'absolute', bottom: 25, left: 15}}>Semarang,{'\n'}Central Java</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.containerView}>
                    <Text style={styles.labelText}>Introducing SweetRoom Max</Text>
                    <TouchableOpacity style={styles.maxCard} activeOpacity={0.9} >
                        <Image style={{width: '100%', height: 190}} source={{uri: 'https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/methode/2019/04/02/53edaba6-512b-11e9-8617-6babbcfb60eb_image_hires_105201.jpg?itok=Z9wEXJtF&v=1554173534'}} />
                        <Text style={{fontFamily: 'AirbnbCerealMedium', color: '#414141', fontWeight: '100', fontSize: 15, paddingTop: 20, paddingLeft: 15, paddingRight: 15}}>Extraordinary rooms with five-star everything</Text>
                        <Text style={{fontFamily: 'AirbnbCerealMedium', color: '#fb8691', fontWeight: '100', fontSize: 13, paddingTop: 20, paddingLeft: 15, paddingRight: 15}}>Explore SweetRoom Max ></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerView}>
                    <Text style={styles.labelText}>Places to stay around the world</Text>
                    <View style={{ width: '100%', height: 408, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <FlatList 
                            data={this.state.hotelList}
                            renderItem={this._renderRow}
                            keyExtractor={ (item) => item.id }
                            numColumns={2}
                        />
                    </View>
                </View>
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
    }
})

export default HomeScreen;
