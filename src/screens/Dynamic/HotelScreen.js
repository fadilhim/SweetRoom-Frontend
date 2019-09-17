/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, TouchableOpacity, ImageBackground, TouchableHighlight, StyleSheet } from 'react-native'
import { View, } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'
import GoogleStaticMap from 'react-native-google-static-map'

class HotelScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            starCount: 3
        }
    }

    onStarRatingPress = (rating) => {
        this.setState({
            starCount: rating
        });
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <ImageBackground style={{ width: '100%', height: 300, borderTopStartRadius: 100 }} source={{uri: 'https://www.ahstatic.com/photos/1867_ho_00_p_2048x1536.jpg'}} />
                    <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, borderTopStartRadius: 35, borderTopEndRadius: 35, backgroundColor: 'white', position: 'relative', top: -50 }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 5, paddingLeft: 10}}>Ibis Hotel</Text>
                        <View style={{ width: '20%', marginBottom: 10, paddingLeft: 10}}>
                            <StarRating
                                disabled={true}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.state.starCount}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={'#fbda91'}
                                starSize={20}
                            />
                        </View>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Location</Text>
                        {/* <GoogleStaticMap
                            style={{ borderRadius: 5, borderColor: 'black', borderWidth: 1 }}
                            latitude={'-7.797068'}
                            longitude={'110.370529'}
                            zoom={13}
                            size={{ width: 100, height: 250 }}
                            apiKey={'AIzaSyDqf0uTouHVU39Q3ZSYPJivEVC2E6oqTH4'}
                        /> */}
                        <View style={{ flexDirection: 'row', width: '80%'}} >
                            <ImageBackground style={{width: 90, height: 90}} source={{uri: 'https://i.stack.imgur.com/dApg7.png'}} />
                            <View style={{paddingLeft: 12, paddingRight: 15, }}>
                                <Text style={{ fontSize: 13, }}>Ibis Hotel, Jl. Malioboro No.52-58, Suryatmajan, Kec. Danurejan, Kota Yogyakarta, Jawa Tengah 55001</Text>
                                <Text style={{ fontSize: 13, marginTop: 5 }}>Yogyakarta</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Room')} style={styles.bookButton} activeOpacity={0.8} >
                        <Text style={{ color: '#fb8691', fontSize: 13, fontFamily: 'AirbnbCerealMedium'}}>Check availability</Text>
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