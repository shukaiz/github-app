import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import styles from './Styles';

//A table for color of each language.
const gitColor = require('./gitColor.json');

/*
This is the screen that shows
notifications.
*/
export default class RepoScreen extends React.Component {
  //Set the title of this screen.
  static navigationOptions = {
    title: 'Notifications',
  };

  //Constructor to prepare API Get request.
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  //Read repo info from API.
  componentDidMount() {
    fetch('https://api.github.com/notifications?all=true', {
      headers: {
        Authorization: 'token '.concat(personalToken),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          data: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  //Returns different color by if the notification is read or not
  getUnreadColor(unread) {
    if (unread) {
      return '#383838';
    } else {
      return '#c7c7c7';
    }
  }

  //Right now if you click notification it doesn't do anything.
  clickEventListener = item => {};

  render() {
    //Renders output on the screen
    return (
      <View style={styles.repoContainer}>
        <FlatList
          style={styles.repoLists}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.repoCard,
                  { borderColor: this.getUnreadColor(item.unread) },
                ]}
                onPress={() => {
                  this.clickEventListener(item);
                }}>
                <View style={styles.repoCardContent}>
                  <Text style={styles.repoName}>
                    {item.reason.replace('_', ' ')}
                  </Text>
                  <Text style={styles.repoDescription}>
                    {item.subject.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
