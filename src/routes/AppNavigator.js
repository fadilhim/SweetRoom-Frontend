/* eslint-disable prettier/prettier */
import React from 'react'
import Icon from 'native-base'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

//Splash Screen

//Auth Screen
import InitScreen from '../screens/Auth/Init Screen'
import LoginScreen from '../screens/Auth/Login Screen'
import SignUpScreen from '../screens/Auth/SignUp/SignUp Screen'
import SignBirthScreen from '../screens/Auth/SignUp/SignBirth'
import SignEmailScreen from '../screens/Auth/SignUp/SignEmail'
import SignNameScreen from '../screens/Auth/SignUp/SignName'
import SignPasswordScreen from '../screens/Auth/SignUp/SignPassword'

//Home Screen
import HomeScreen from '../screens/Home/Home Screen'
import SavedScreen from '../screens/Home/Saved Screen'
import HistoryScreen from '../screens/Home/History Screen'
import ChatScreen from '../screens/Home/Chat Screen'
import ProfileScreen from '../screens/Home/Profile Screen'

//Dynamic Screen

const HomeTabNavigation = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="MaterialCommunityIcons" name="chat" style={{fontSize:22 , color:`${tintColor}`}} />
                ),
                title: 'Chats'
            },
        },
        Saved: {
            screen: SavedScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="FontAwesome5" name="user-friends" style={{fontSize:22 , color:`${tintColor}`}} />
                ),
                title: 'Saved'
            },
        },
        History: {
            screen: HistoryScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="FontAwesome5" name="user-friends" style={{fontSize:22 , color:`${tintColor}`}} />
                ),
                title: 'History'
            },
        },
        Chat: {
            screen: ChatScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                <Icon type="MaterialIcons" name="location-on" style={{fontSize:22, color:`${tintColor}`}}/>
                ),
                title: 'Chat'
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome5" name="user" style={{fontSize:22, color:`${tintColor}`}}/>
                ),
                title: 'Profile'
            },
        },
    },{
        tabBarOptions: { 
            showIcon: true,
            activeTintColor: 'white',
            inactiveTintColor: '#999999',
            activeBackgroundColor: '#232b2b',
            inactiveBackgroundColor: '#232b2b',
            borderTopWidth: 0,
        },
    }
)

const SignUpNavigation = createStackNavigator(
    {
        SignUp: { screen: SignUpScreen },
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
    }
)

const AppNavigation = createSwitchNavigator(
    {
        Init: { screen: InitStack },
        Home: { screen: HomeTabNavigation },
    }
)

export default createAppContainer( AppNavigation )