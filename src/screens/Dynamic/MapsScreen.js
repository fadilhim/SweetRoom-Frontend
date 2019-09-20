/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, StyleSheet, } from 'react-native'
import { View, } from 'native-base'
import MapView, {PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

class MapScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: props.navigation.getParam('position'),
            userPosition: {
                latitude: -7.250445,
                longitude: 112.768845,
            }
        }
    }

    componentDidMount = async () => {
        
    }

    render() {
        console.log(this.state.position.lat)
        console.log(this.state.position.long)
        return ( 
            <View style={styles.viewStyles}>
                <MapView
                    style={{width: '100%', height: '100%'}}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: parseInt(this.state.position.lat) || 0,
                        longitude: parseInt(this.state.position.long) || 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    zoomControlEnabled={true}
                    showsUserLocation={true}
                    followUserLocation={true}
                >
                    <Marker
                        // title={user.fullname || null}
                        // description={user.status || null}
                        key={this.state.position.long + this.state.position.lat}
                        coordinate={{ 
                            latitude: parseInt(this.state.position.lat) || 0,
                            longitude: parseInt(this.state.position.long) || 0
                        }}
                    />
                    <MapViewDirections
                        origin={this.state.userPosition}
                        destination={{ latitude: parseInt(this.state.position.lat), longitude: parseInt(this.state.position.long) }}
                        apikey={'AIzaSyDqf0uTouHVU39Q3ZSYPJivEVC2E6oqTH4'}
                        // strokeWidth={3}
                        // strokeColor="hotpink"
                    />
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