/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native'
import { View, Icon } from 'native-base'
import Axios from 'axios'
import StarRating from 'react-native-star-rating'

class SweetMaxScreen extends Component {
    constructor(props) {
        super(props)
        this.state ={
            hotelList: [],
            page: 0,
            hotelFlatLi: [],
            scrollBegin: false,
            search: ''
        }
    }

    componentDidMount = async () => {
        Axios.get('http://192.168.100.36:1010/hotel/searchrate/5')
            .then(res => {
                this.setState({
                    hotelList: res.data.result,
                    page: 0
                }, () => this.addRecords(0) )
            })
    }

    addRecords = (page) => {
        // assuming this.state.hotelList hold all the records
        const newRecords = []
        for (let i = page * 2, il = i + 2; i < il && i < this.state.hotelList.length; i++){
            newRecords.push(this.state.hotelList[i]);
        }
        this.setState({
            hotelFlatLi: [...this.state.hotelFlatLi, ...newRecords]
        });
    }

    onScrollHandler = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.addRecords(this.state.page);
        });
    }

    _renderRow = ({item}) =>{
        let image = item.image
        return(
            <TouchableOpacity style={{width: '49%', height: 200, marginBottom: 10, marginRight: 5}} onPress={ () => this.props.navigation.navigate('Hotel', {data: item})} activeOpacity={0.8} >
                <Image style={{ width: '100%', height: 120}} source={{uri: image.includes('jpg') || image.includes('.co')  ? image : 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg' }} />
                <TouchableOpacity 
                    onPress={ () => this.handleFav()}
                    style={{height: 20, width: 20, position: 'absolute', right: 10, top: 10}}
                >
                    <Icon type='AntDesign' name={this.state.love === true ? 'heart' : 'hearto'} style={{ color: 'red', fontSize: 17,}} />
                </TouchableOpacity>
                <Text style={styles.textCityCard}>{item.city.toUpperCase()}</Text>
                <Text style={styles.textNameCard}>{item.hotel_name}</Text>
                <Text style={styles.textPriceCard}>Rp {item.price.slice(0, -3)}K/night</Text>
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
            <ScrollView nestedScrollEnabled={true} style={{flex: 1, paddingTop: 15, paddingLeft: 13, paddingRight: 13}}>
                <View style={{flexDirection: 'row', width: '100%'}} />
                {/* <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>Search</Text> */}
                <FlatList
                    data={this.state.hotelFlatLi}
                    renderItem={this._renderRow}
                    keyExtractor={ (item) => item.id }
                    numColumns={2}
                    onEndReached={this.onScrollHandler}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b444b'
    },
    containerView:{
        paddingLeft: 13,
        paddingRight: 13,
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
    roomContainer: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

})

export default SweetMaxScreen