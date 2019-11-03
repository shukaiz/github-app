import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { AsyncStorage } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/*
This is the screen that shows
all the users that this user
is following.
*/
export default class FollowingScreen extends React.Component {
  static navigationOptions = {
    title: 'Following',
  };

  //Constructor to prepare API Get request.
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
    //Create a copy array to store filtered items during search.
    this.searchArray = [];
  }

  //Get user's following using GitHub's API.
  async componentDidMount() {
    fetch(
      'https://api.github.com/users/'.concat(gitUserName).concat('/following')
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          data: responseJson,
        });
        this.searchArray = responseJson; //Saves another copy of data to search.
      })
      .catch(error => console.log(error)); //to catch the errors if any

    //Store the users following.
    try {
      await AsyncStorage.setItem(
        'followingList',
        JSON.stringify(this.state.data)
      );
    } catch (error) {
      // Error saving data
    }
  }

  //Retreive the data stored when API was called.
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('followingList');
      if (value !== null) {
        console.log(value); //Log the data retreived.
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  //Search when typing in search bar.
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    //Search and return filtered data.
    const newData = this.searchArray.filter(item => {
      const itemData = `${item.login.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  //Search bar header to be called in FlatList.
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search following"
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  //Update username and navigate back to profile page.
  onPressUser(newUserName) {
    gitUserName = newUserName;
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.userListContainer}>
        <FlatList
          style={styles.userList}
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.userElement}
                onPress={() => this.onPressUser(item.login)}>
                <Image
                  style={styles.userAvatar}
                  source={{ uri: item.avatar_url }}
                />

                <Text style={styles.userFullName}>
                  {item.login}
                  {'\n'}
                  <Text style={styles.userAccountName}>{item.html_url}</Text>
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.login}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}
