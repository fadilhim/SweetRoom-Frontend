/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, } from 'react-native'
import { View, } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import MapView, {PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import firebase from 'firebase'
import Geolocation from 'react-native-geolocation-service'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

class MapScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.navigation.getParam('item'),
        }
    }

    componentDidMount = async () => {
        
    }

    render() {
        return ( 
            <View style={styles.viewStyles}>
                <MapView
                    style={{width: '100%', height: '100%'}}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    zoomControlEnabled={true}
                    showsUserLocation={true}
                    followUserLocation={true}
                >
                    {/* <Marker
                        title={user.fullname || null}
                        description={user.status || null}
                        key={this.state.userPosition}
                        coordinate={{ 
                            latitude: this.state.userPosition.latitude,
                            longitude: this.state.userPosition.longitude
                        }}
                    > </Marker> */}
                </MapView>
            </View>
        )}
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
})

export default MapScreen