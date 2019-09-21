/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, TextInput, Dimensions } from 'react-native'
import { View, Icon } from 'native-base'
import Axios from 'axios'
import StarRating from 'react-native-star-rating'

class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state ={
            hotelList: [],
            page: 0,
            hotelFlatLi: [],
            scrollBegin: false,
            search: '',
            turn: props.navigation.getParam('turn') || false,
            turnCity: props.navigation.getParam('turnCity') || false,
            city: props.navigation.getParam('city') || false,
            emptyData: false
        }
    }

    componentDidMount = async () => {
        if (this.state.turn){
            Axios.get('https://sweetappbackend.herokuapp.com/hotel')
                .then(res => {
                    this.setState({
                        hotelList: res.data.result.data,
                        page: 0
                    }, () => this.addRecords(0) )
                })
        } else if (this.state.turnCity){
            Axios.get(`https://sweetappbackend.herokuapp.com/hotel/search/${this.state.city}`)
                .then(res => {
                    this.setState({
                        hotelList: res.data.result
                    }, () => this.addRecords(0))
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }

    handleSearch = (value) => {
        if(this.state.search.length > 0) {
            this.setState({
                hotelFlatLi: [],
                hotelList: []
            })
            Axios.get(`https://sweetappbackend.herokuapp.com/hotel/search/${this.state.search || value}`)
                .then(res => {
                    this.setState({
                        hotelList: res.data.result
                    }, () => this.addRecords(0))
                    if (res.data.result.length < 1){
                        this.setState({emptyData: true})
                    }
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }

    addRecords = (page) => {
        // assuming this.state.hotelList hold all the records
        const newRecords = []
        for (let i = page * 12, il = i + 12; i < il && i < this.state.hotelList.length; i++){
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
                <Image style={{ width: '100%', height: 120}} source={{uri: image ? image : 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg' }} />
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
        let height = Math.round(Dimensions.get('window').height)
        console.log(this.state.hotelFlatLi)
        return(
            <ScrollView nestedScrollEnabled={true} style={{flex: 1, paddingTop: 15, paddingLeft: 13, paddingRight: 13, height: height}}>
                <View style={{flexDirection: 'row', width: '100%', }}>
                    <TextInput
                        underlineColorAndroid='#fb8691'
                        onChangeText={ (value) => this.setState({search: value})}
                        onSubmitEditing={ (value) => this.handleSearch(value)}
                        style={{width: '80%', height: 40, backgroundColor: '#fb8691', borderRadius: 10, color: 'white', paddingLeft: 20, marginBottom: 15}}
                    />
                    <TouchableOpacity style={{ width: '20%', height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.handleSearch()} ><Text style={{color: 'grey'}}>Search</Text></TouchableOpacity>
                </View>
                {this.state.emptyData ?
                    <View style={{justifyContent: 'center', alignItems: 'center', height: height*0.8, width: '100%', }}>
                        <Icon type='Octicons' name='file-directory' style={{ fontSize: 150, color: '#fb9e91'}} />
                        <Text style={{color: '#fb9e91'}}>Whoops, we're unable to find data you're looking for</Text>
                    </View>
                    :
                    <Text></Text>
                }
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

export default SearchScreen