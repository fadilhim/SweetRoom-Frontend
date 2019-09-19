/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Icon } from 'native-base'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

//Splash Screen

//Auth Screen
import AuthLoadScreen from '../screens/Auth/AuthLoading'
import InitScreen from '../screens/Auth/Init Screen'
import LoginScreen from '../screens/Auth/LoginScreen'
import SignBirthScreen from '../screens/Auth/SignUp/SignBirth'
import SignEmailScreen from '../screens/Auth/SignUp/SignEmail'
import SignNameScreen from '../screens/Auth/SignUp/SignName'
import SignPasswordScreen from '../screens/Auth/SignUp/SignPassword'

//Home Screen
import HomeScreen from '../screens/Home/HomeScreen'
import SavedScreen from '../screens/Home/SavedScreen'
import HistoryScreen from '../screens/Home/HistoryScreen'
import ChatScreen from '../screens/Home/ChatScreen'
import ProfileScreen from '../screens/Home/ProfileScreen'

//Dynamic Screen
import HotelScreen from '../screens/Dynamic/HotelScreen'
import RoomScreen from '../screens/Dynamic/RoomScreen'
import CheckoutScreen from '../screens/Dynamic/CheckoutScreen'

const HomeTabNavigation = createBottomTabNavigator(
    {
        Explore: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="AntDesign" name="search1" style={{fontSize:22 , color:`${tintColor}`}} />
                ),
                title: 'Explore'
            },
        },
        History: {
            screen: HistoryScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="FontAwesome" name="sticky-note-o" style={{fontSize:22 , color:`${tintColor}`}} />
                ),
                title: 'History'
            },
        },
        Saved: {
            screen: SavedScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="AntDesign" name="hearto" style={{fontSize:22 , color:`${tintColor}`}} />
                ),
                title: 'Saved'
            },
        },
        Chat: {
            screen: ChatScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                <Icon type="MaterialIcons" name="chat-bubble-outline" style={{fontSize:22, color:`${tintColor}`}}/>
                ),
                title: 'Chats'
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                <Icon type="SimpleLineIcons" name="user" style={{fontSize:22, color:`${tintColor}`}}/>
                ),
                title: 'Profile'
            },
        },
    },{
        tabBarOptions: { 
            activeTintColor: '#fb8691',
            inactiveTintColor: '#52525290',
            activeBackgroundColor: 'white',
            inactiveBackgroundColor: 'white',
        },
    },
)

const MainPage = createStackNavigator(
    {
        Home: { screen: HomeTabNavigation },
        Hotel: { screen: HotelScreen },
        Room: { screen: RoomScreen },
        Checkout: { screen: CheckoutScreen },
    },{
        headerMode: "none",
    }
)

const SignUpNavigation = createStackNavigator(
    {
        Name: { screen: SignNameScreen },
        Email: { screen: SignEmailScreen },
        Password: { screen: SignPasswordScreen },
        Birthday: { screen: SignBirthScreen },
    },{
        headerMode: 'none'
    }
)

const InitStack = createStackNavigator(
    {
        Init: { screen: InitScreen },
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpNavigation },
    },{
        headerMode: 'none'
    }
)

const AppNavigation = createSwitchNavigator(
    {
        AuthLoad: { screen: AuthLoadScreen },
        Initial: { screen: InitStack },
        HomeTab: { screen: MainPage },
    }
)

export default createAppContainer( AppNavigation )