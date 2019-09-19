/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'react-native-firebase'

// import firebaseConfig from '../../config/firebase'

export default class AuthLoadingScreen extends React.Component {
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
    
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }
    
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }
    
    async createNotificationListeners() {
        firebase.notifications().onNotification(notification => {
            notification.android.setChannelId('insider').setSound('default')
            firebase.notifications().displayNotification(notification)
        });
    }
    componentDidMount = async () => {
        const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
        firebase.notifications().android.createChannel(channel);
        this.checkPermission();
        this.createNotificationListeners();
        firebase.auth()
            .signInAnonymously()
            .then(credential => {
                if (credential) {
                console.warn('default app user cuk ->', credential.user.toJSON());
                }
            });
        await AsyncStorage.getItem('token')
            .then(
                (result) => this.props.navigation.navigate(result ? 'HomeTab' : 'Initial')
            )
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}