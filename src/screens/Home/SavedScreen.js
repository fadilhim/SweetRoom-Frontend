/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { View, Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'

class SavedScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <ScrollView style={{ flex: 1, paddingTop: 15, }}>
                <View style={styles.containerView}>
                    <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>Saved</Text>
                    <View style={{ backgroundColor: '#52525220', borderRadius: 15, width: '97%', height: 180, alignItems: 'center', flexDirection: 'row', marginLeft: 8 }}>
                        <View style={{ width: '40%', height: 170, position: 'relative', left: -9, }}>
                            <ImageBackground source={{uri: 'http://www.baliultimatevillas.net/wp-content/uploads/2016/06/1.-Villa-Amy-Pool-Tropical-Garden-Summer-Bali.jpg'}} imageStyle={{borderRadius: 15}} style={{ width: '100%', height: '100%'}} >
                                <TouchableOpacity onPress={ () => console.warn('eh kepencet')} style={{height: 20, width: 20, position: 'absolute', left: 10, top: 10 }}>
                                    <Icon type='AntDesign' name='heart' style={{ color: 'red', fontSize: 17,}} />
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View style={{width: '57%', height: 150, justifyContent: 'space-between'}}>
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
                                <View>
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#414141', alignSelf: 'flex-end', fontSize: 18 }}>200K</Text>
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#41414180', alignSelf: 'flex-end', fontSize: 12 }}>/Night</Text>
                                </View>
                            </View>
                            <View style={{ position: 'relative', bottom: 20,}}>
                                <View style={{ backgroundColor: 'white', width: 70, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'AirbnbCerealMedium', fontSize: 13, color: '#414141' }} >9:00 AM</Text>
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

export default SavedScreen