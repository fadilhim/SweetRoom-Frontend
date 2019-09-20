/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, ImageBackground, TouchableHighlight, StyleSheet } from 'react-native'
import { View, Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'

class HotelScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            starCount: 3,
            data: props.navigation.getParam('data')
        }
    }

    componentDidMount = () => {
        // console.warn(this.state.data)
    }

    onStarRatingPress = (rating) => {
        this.setState({
            starCount: rating
        });
    }

    render() {
        let data = this.state.data
        console.log(data)
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground style={{ width: '100%', height: 300, }} imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} source={{uri: data.image}} />
                    <View style={{ position: 'relative', top: -40, left: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 30, width: '60%', height: 100, shadowColor: "#000", shadowOffset: { width: 0, height: 9, }, shadowOpacity: 0.48, shadowRadius: 11.95, elevation: 18,}}> 
                        <Text style={{ fontWeight: 'bold', fontSize: 30, paddingLeft: 10, color: '#525252'}}>{data.hotel_name.toUpperCase()}</Text>
                        <StarRating
                            disabled={true}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={data.rate}
                            fullStarColor={'#fbda91'}
                            starSize={20}
                        />
                        <View style={{ flexDirection: 'row'}}>
                            <Icon type='Entypo' name='location-pin' style={{ color: 'red', fontSize: 20}} />
                            <Text style={{ fontSize: 12, marginTop: 5 }}>{data.city}</Text>
                        </View>
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }} >
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Location</Text>
                        <View style={{ flexDirection: 'row', width: '80%'}} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('Map', {position: {lat: data.latitude, long: data.longitude}})}>
                                <ImageBackground style={{width: 90, height: 90}} source={{uri: 'https://i.stack.imgur.com/dApg7.png'}} />
                            </TouchableOpacity>
                            <View style={{paddingLeft: 12, paddingRight: 15, }}>
                                <Text style={{ fontSize: 13, color: '#525252', }}>{data.address}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Room', {name: data.hotel_name, id: data.id})} style={styles.bookButton} activeOpacity={0.8} >
                        <Text style={{ color: '#fb8691', fontSize: 13, fontFamily: 'AirbnbCerealMedium'}}>Check room</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
// #fbda91
const styles = StyleSheet.create({
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
    bookButton: {
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