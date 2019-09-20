/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import {
    Text,
    StatusBar,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import { ListItem, Left, Body, Right, Thumbnail, Container, Content, List, Title } from 'native-base'

class ChatScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            dataUser: [],
            dataMessages: [''],
        }
    }

    componentDidMount = async () => {
      await AsyncStorage.getItem('token')
            .then(
                (result) => {
                    !result ? 
                        this.props.navigation.navigate('Login') : ''
                }
            )
      await AsyncStorage.getItem('tokenXendit')
      await AsyncStorage.getItem('dataUser')
          .then( res => {
              this.setState({ id: JSON.parse(res).id})
              console.warn(JSON.parse(res).id)
              firebase
                  .database()
                  .ref('users')
                  .on('value', _res => {
                  const data = Object.keys(_res.val()).map(Key => {
                      return _res.val()[Key];
                  });
                  this.setState({
                      dataUser: data,
                  });
              });
              firebase
                  .database()
                  .ref('messages/' + JSON.parse(res).id)
                  .on('value', _res => {
                      if (_res.val() != null) {
                          const data = Object.keys(_res.val());
                          this.setState({
                              dataMessages: data ,
                          });
                      }
              });
      })
    }

    _renderRow = (post) => {
        let width = Math.round(Dimensions.get('window').width)
        const messages = this.state.dataMessages;
        const item = post.item;
        console.warn(post, messages);
        if (item.id) {
          return (
              <ScrollView>
                  <List style={{width: width}}>
                    <ListItem avatar style={ item.id === this.state.id ? {display: 'none'} : styles.card}
                      onLongPress={() => this.props.navigation.navigate('FriendProfile', { ChatId: item.id, })} 
                      onPress={() => this.props.navigation.navigate('ChatRoom', {ChatId: item.id})}>
                      <Left>
                        <Thumbnail source={{uri: item.photo}}/>
                      </Left>
                      <Body>
                        <Text style = {{fontWeight:'bold'}}>{item.first_name}</Text>
                        <Text>Click here to message ...</Text>
                      </Body>
                      <Right>
                        <Title style={'online' === 'online' ? styles.connect : styles.disconnect} />
                          <Text style = {{color:'black'}}>{' '} {item.city}</Text>
                      </Right>
                    </ListItem>
                  </List>
              </ScrollView>
          );
        }
    }

    render() {
        const messages = this.state.dataMessages;
        // console.warn(this.state.dataUser)
        return (
          <View style={styles.containerView}>
            <Text style={{ fontFamily: 'AirbnbCerealMedium', alignSelf: 'flex-start', fontSize: 30, color: '#414141', marginBottom: 25}}>Chats</Text>
            <FlatList
              key={messages.length}
              data={this.state.dataUser}
              keyExtractor={item => item.id}
              renderItem={this._renderRow}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView:{
        paddingLeft: 13,
        paddingRight: 13,
        alignItems: 'center',
    },
    connect: {
      height: 7,
      width: 7,
      backgroundColor: 'green',
      borderRadius: 10,
      margin: 1,
    },
    disconnect: {
      height: 7,
      width: 7,
      backgroundColor: 'red',
      borderRadius: 10,
      margin: 1,
    },
    card: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 10,
      height: 60,
      borderBottomWidth: 0.2,
    },
    cardContent: {
      top: '0.00%',
      left: '0.00%',
      width: '100%',
      height: 50,
    },
    cardImage: {
      top: '0.00%',
      left: '0.00%',
      width: 50,
      height: 50,
      backgroundColor: 'transparent',
      borderRadius: 60,
      borderColor: 'transparent',
    },
    cardTitle: {
      top: '12.73%',
      left: '19.76%',
      backgroundColor: 'transparent',
      color: 'rgba(22,31,61,1)',
      position: 'absolute',
      width: '50%',
      height: 50,
      opacity: 8,
      fontSize: 15,
      fontFamily: 'montserrat-medium',
    },
    cardChat: {
      top: '52.73%',
      left: '19.76%',
      backgroundColor: 'tomato',
      color: 'black',
      position: 'absolute',
      width: 100,
      height: 50,
      opacity: 0.65,
      fontSize: 13,
      fontFamily: 'montserrat-regular',
    },
    cardTime: {
      top: '63.64%',
      left: '85.03%',
      backgroundColor: 'transparent',
      color: 'rgba(22,31,61,1)',
      opacity: 0.4,
      width: 50,
      height: 50,
      fontSize: 10,
      fontFamily: 'montserrat-regular',
      textAlign: 'right',
    },
})

export default ChatScreen