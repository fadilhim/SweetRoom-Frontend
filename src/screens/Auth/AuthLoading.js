/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

// import firebaseConfig from '../../config/firebase'

export default class AuthLoadingScreen extends React.Component {
    componentDidMount = async () => {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: 'AIzaSyDqf0uTouHVU39Q3ZSYPJivEVC2E6oqTH4',
            authDomain: 'sweetroom-aa1e2.firebaseapp.com',
            databaseURL: 'https://sweetroom-aa1e2.firebaseio.com',
            projectId: 'sweetroom-aa1e2',
            storageBucket: 'sweetroom-aa1e2.appspot.com',
            messagingSenderId: '838539810985',
            appId: '1:838539810985:web:d679f4f5b2ad2fac6231b8',
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        await AsyncStorage.getItem('token')
            .then(
                (result) => this.props.navigation.navigate(result ? 'HomeTab' : 'Initial')
            );
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
