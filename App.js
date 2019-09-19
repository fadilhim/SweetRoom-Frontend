import React, { Component } from 'react'
import AppNavigation from './src/routes/AppNavigator'
import { Root } from 'native-base';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

export default class App extends Component {
  constructor(properties) {
    super(properties);
    // this.state({})

    OneSignal.init('b5c1d4d2-3360-438e-9ce1-30f93ba3cc22');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount = () => {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds = (device) => {
    console.log('Device info: ', device);
    this.setState({ device })
  }
  render() {
    return (
      <Root>
        <AppNavigation />
      </Root>
    )
  }
}