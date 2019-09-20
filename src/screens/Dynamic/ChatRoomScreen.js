/* eslint-disable prettier/prettier */
import React, {Fragment} from 'react';
// import {Text, TextInput, FlatList, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import {Image} from 'react-native';

class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        phone: '',
        name: '',
        id: '',
        image: '',
        status: '',
        text: '',
        messagesList: [],
        FriendsInfo: {},
        };
    }
    componentDidMount = async () => {
        const chatId = this.props.navigation.state.params.ChatId;
        await AsyncStorage.getItem('dataUser').then(res => {
        this.setState({
            id: JSON.parse(res).id,
            name: JSON.parse(res).first_name,
            image: JSON.parse(res).photo,
        });
        });
        await firebase
        .database()
        .ref('messages')
        .child(this.state.id)
        .child(chatId)
        .on('child_added', value => {
            this.setState(previousState => {
            return {
                messagesList: GiftedChat.append(
                previousState.messagesList,
                value.val(),
                ),
            };
            });
            // console.warn(value.val(), 'mmsdsj');
        });
        await firebase
        .database()
        .ref('users')
        .once('value')
        .then(_res => {
            const data = _res.val()[chatId];
            this.setState({
            FriendsInfo: data,
            });
        });
        await firebase
        .database()
        .ref('users')
        .on('value')
        .then(_res => {
            const data = _res.val()[chatId];
            this.setState({
            FriendsInfo: data,
            });
        });
    };
    sendMessage = () => {
        if (this.state.text.length > 0) {
        const chatId = this.props.navigation.state.params.ChatId;
        let msgId = firebase
            .database()
            .ref('messages')
            .child(this.state.id)
            .child(chatId)
            .push().key;
        let updates = {};
        let message = {
            _id: msgId,
            text: this.state.text,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            user: {
            _id: this.state.id,
            name: this.state.name,
            avatar: this.state.image,
            },
        };
        updates[
            'messages/' + this.state.id + '/' + chatId + '/' + msgId
        ] = message;
        updates[
            'messages/' + chatId + '/' + this.state.id + '/' + msgId
        ] = message;
        firebase
            .database()
            .ref()
            .update(updates);
        this.setState({
            text: '',
        });
        }
    };
    render() {
        const data = this.state;
        return (
        <Fragment>
            <Header style={{backgroundColor: '#1E90FF'}}>
            <Left>
                <Button
                transparent
                onPress={() => this.props.navigation.navigate('Chat')}>
                <Icon name="arrow-back" />
                </Button>
            </Left>
            <Left>
                <Image
                style={{height: 40, width: 40, borderRadius: 60}}
                source={{uri: data.FriendsInfo.photo}}
                />
            </Left>
            <Body>
                <Title>{data.FriendsInfo.first_name || 'wait'}</Title>
            </Body>
            <Right>
                {/* <Button transparent>
                <Icon name="ios-videocam" />
                </Button>
                <Button transparent>
                <Icon name="call" />
                </Button> */}
                <Button
                transparent
                onPress={() =>
                    this.props.navigation.navigate('FriendProfile', {
                    ChatId: data.FriendsInfo.id,
                    })
                }>
                <Icon name="more" />
                </Button>
            </Right>
            </Header>
            <GiftedChat
            text={data.text}
            messages={data.messagesList}
            onSend={this.sendMessage}
            user={{
                _id: data.id,
                name: data.name,
                avatar: data.image,
            }}
            onInputTextChanged={val => this.setState({text: val})}
            />
        </Fragment>
        );
    }
}

export default ChatRoom;

