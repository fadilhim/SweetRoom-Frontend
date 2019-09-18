/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { View, Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'

class HistoryScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                <View style={styles.containerView}>
                    <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>History</Text>
                    <View style={{ backgroundColor: '#52525220', borderRadius: 15, width: '97%', height: 180, alignItems: 'center', flexDirection: 'row', marginLeft: 8 }}>
                        <View style={{ width: '40%', height: 170, position: 'relative', left: -9, }}>
                            <ImageBackground source={{uri: 'http://www.baliultimatevillas.net/wp-content/uploads/2016/06/1.-Villa-Amy-Pool-Tropical-Garden-Summer-Bali.jpg'}} imageStyle={{borderRadius: 15}} style={{ width: '100%', height: '100%'}} />
                        </View>
                        <View style={{width: '57%', height: 150, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{ width: '65%' }}>
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#414141', fontSize: 20 }}>Villa Amy</Text>
                                    <View style={{ width: '30%',}}>
                                        <StarRating
                                            disabled={true}
                                            emptyStar={'ios-star-outline'}
                                            fullStar={'ios-star'}
                                            halfStar={'ios-star-half'}
                                            iconSet={'Ionicons'}
                                            maxStars={5}
                                            rating={4}
                                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                            fullStarColor={'#fbda91'}
                                            starSize={15}
                                        />
                                    </View>
                                </View> 
                                <View style={{ width: '35%', alignItems: 'flex-end' }}>
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', fontSize: 13, color: '#414141' }} >Canceled</Text>
                                </View>
                            </View>
                            <View style={{ position: 'relative', marginTop: 8,}}>
                                <View style={{ flexDirection: 'row'}} >
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#414141', fontSize: 14 }}>400K</Text>
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#41414180', fontSize: 14, }}>/2 Night</Text>
                                </View>
                                <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#414141', fontSize: 16, marginTop: 20, marginBottom: 5}} >Date</Text>
                                <View style={{flexDirection: 'row', }}>
                                    <View style={{ backgroundColor: 'white', width: '90%', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                        <Text style={{ fontFamily: 'AirbnbCerealMedium', fontSize: 13, color: '#414141' }} >17 Jan 2019 - 20 Jan 2019</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
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
})

export default HistoryScreen