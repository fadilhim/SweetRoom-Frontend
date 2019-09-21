/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { View, Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import StarRating from 'react-native-star-rating'
import Axios from 'axios'

class RoomScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            hotel_name: props.navigation.getParam('name'),
            hotel_id: props.navigation.getParam('id'),
            detail_data: []
        }
    }

    componentDidMount= async () => {
        Axios.get(`https://sweetappbackend.herokuapp.com/room/${this.state.hotel_id}`)
            .then(res => {
                this.setState({
                    detail_data: res.data.result.data
                })
            })
    }

    _renderRow = ({item}) => {
        let status = item.status == 1 ? 'Available' : 'Not Available'
        return(
            <TouchableOpacity style={{marginBottom: 5}} activeOpacity={0.9} onPress={ () => this.props.navigation.navigate('Checkout', {item: item, })} >
                <View style={{ backgroundColor: '#52525220', borderRadius: 15, width: '97%', height: 180, alignItems: 'center', flexDirection: 'row', marginLeft: 8, marginBottom: 8, shadowColor: "#000", }}>
                    <View style={{ width: '40%', height: 170, position: 'relative', left: -9, }}>
                        <ImageBackground source={{uri: item.image}} imageStyle={{borderRadius: 15}} style={{ width: '100%', height: '100%'}} />
                    </View>
                    <View style={{width: '57%', height: 150, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ width: '65%' }}>
                                <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#414141', fontSize: 20 }}>{item.bed_type.toUpperCase()}</Text>
                            </View> 
                            <View style={{ width: '35%', alignItems: 'flex-end' }}>
                                <Text style={{ fontFamily: 'AirbnbCerealMedium', fontSize: 13, color: `${status == 'Available' ? 'green': 'red'}` }} >{status.toUpperCase()}</Text>
                            </View>
                        </View>
                        <View style={{ position: 'relative', marginTop: 8,}}>
                            <View style={{ flexDirection: 'row'}} >
                                <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#414141', fontSize: 14 }}>{item.price.slice(0, -3)}K</Text>
                                <Text style={{ fontFamily: 'AirbnbCerealMedium', color: '#41414180', fontSize: 14, }}>/Night</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', width: '30%', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 5, marginTop: 10 }}>
                            <Text style={{ fontFamily: 'AirbnbCerealMedium', fontSize: 13, color: '#414141' }} >{item.room_number}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{ flex: 1, paddingTop: 15, paddingLeft: 15, paddingRight: 15}}>
                    <View style={styles.containerView}>
                        <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 7}}>{this.state.hotel_name.toUpperCase()}</Text>
                    </View>
                    <FlatList 
                        data={this.state.detail_data}
                        renderItem={this._renderRow}
                        keyExtractor={ (item) => item.id }
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerView:{
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 8,
    },
})

export default RoomScreen