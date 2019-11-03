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
import Dialog from 'react-native-dialog';
import styles from './Styles';

/*
This is the home screen of the app
should show the repo information
of the user defined above.
*/
export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  //Constructor to prepare API Get request.
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  //Get user's information using GitHub's API.
  getAPI() {
    fetch('https://api.github.com/users/'.concat(gitUserName))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          data: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  //Call API when component is mounted.
  componentDidMount() {
    this.getAPI();
  }

  //Recall API when this page is reused.
  componentDidUpdate() {
    this.getAPI();
  }

  //Four dialogs to perform PUT is set to invisible by default.
  state = {
    followDialogVisible: false,
    unfollowDialogVisible: false,
    starDialogVisible: false,
    unstarDialogVisible: false,
  };

  //Show each dialog when text button is pressed.
  showFollowDialog = () => {
    this.setState({ followDialogVisible: true });
  };
  showUnfollowDialog = () => {
    this.setState({ unfollowDialogVisible: true });
  };
  showStarDialog = () => {
    this.setState({ starDialogVisible: true });
  };
  showUnstarDialog = () => {
    this.setState({ unstarDialogVisible: true });
  };

  //Disappear dialogs when cancel is pressed.
  handleCancel = () => {
    this.setState({ followDialogVisible: false });
    this.setState({ unfollowDialogVisible: false });
    this.setState({ starDialogVisible: false });
    this.setState({ unstarDialogVisible: false });
  };

  //API request to follow a user.
  followUser = username => {
    fetch('https://api.github.com/user/following/'.concat(username), {
      headers: {
        Authorization: 'token '.concat(personalToken),
      },
      method: 'PUT',
    }).catch(error => console.log(error));
    this.setState({ followDialogVisible: false });
  };

  //API request to unfollow a user.
  unfollowUser = username => {
    fetch('https://api.github.com/user/following/'.concat(username), {
      headers: {
        Authorization: 'token '.concat(personalToken),
      },
      method: 'DELETE',
    }).catch(error => console.log(error));
    this.setState({ unfollowDialogVisible: false });
  };

  //API request to star a repository.
  starRepo = reponame => {
    fetch('https://api.github.com/user/starred/'.concat(reponame), {
      headers: {
        Authorization: 'token '.concat(personalToken),
      },
      method: 'PUT',
    }).catch(error => console.log(error));
    this.setState({ starDialogVisible: false });
  };

  //API request to unstar a repository.
  unstarRepo = reponame => {
    fetch('https://api.github.com/user/starred/'.concat(reponame), {
      headers: {
        Authorization: 'token '.concat(personalToken),
      },
      method: 'DELETE',
    }).catch(error => console.log(error));
    this.setState({ unstarDialogVisible: false });
  };

  //Renders output on the screen
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.header}
          source={{
            uri:
              'https://kinsta.com/wp-content/uploads/2018/04/what-is-github-1-1.png',
          }}
        />
        <Image
          style={styles.avatar}
          source={{
            uri: this.state.data.avatar_url,
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            {/*Show profile data*/}
            <Text style={styles.name}>{this.state.data.name}</Text>
            <Text style={styles.username}>{this.state.data.login}</Text>
            <Text style={styles.text}>{this.state.data.bio}</Text>

            {/*Clickable link for website*/}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(this.state.data.blog)}>
              {this.state.data.blog}
            </Text>

            {/*Buttons navigate to three other screens*/}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Repo')}>
              <Text style={styles.text}>
                {this.state.data.public_repos} Repositories
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Follower')}>
              <Text style={styles.text}>
                {this.state.data.followers} Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Following')}>
              <Text style={styles.text}>
                {this.state.data.following} Following
              </Text>
            </TouchableOpacity>

            {/*Operations to follow/unfollow/star*/}
            <View style={styles.opsContainer}>
              <TouchableOpacity
                style={styles.opsText}
                onPress={this.showFollowDialog}>
                <Text style={styles.opsText}>Follow</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.opsText}
                onPress={this.showUnfollowDialog}>
                <Text style={styles.opsText}>Unfollow</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.opsText}
                onPress={this.showStarDialog}>
                <Text style={styles.opsText}>Star</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.opsText}
                onPress={this.showUnstarDialog}>
                <Text style={styles.opsText}>Unstar</Text>
              </TouchableOpacity>
            </View>

            {/*Dialogs to follow*/}
            <Dialog.Container visible={this.state.followDialogVisible}>
              <Dialog.Title>Follow another user</Dialog.Title>
              <Dialog.Description>Username to follow:</Dialog.Description>
              <Dialog.Input
                label="User name"
                onChangeText={username => this.setState({ username })}
                onSubmitEditing={() => this.followUser(this.state.username)}
              />
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            </Dialog.Container>

            {/*Dialogs to unfollow*/}
            <Dialog.Container visible={this.state.unfollowDialogVisible}>
              <Dialog.Title>Unfollow another user</Dialog.Title>
              <Dialog.Description>Username to unfollow:</Dialog.Description>
              <Dialog.Input
                label="User name"
                onChangeText={username => this.setState({ username })}
                onSubmitEditing={() => this.unfollowUser(this.state.username)}
              />
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            </Dialog.Container>

            {/*Dialogs to star*/}
            <Dialog.Container visible={this.state.starDialogVisible}>
              <Dialog.Title>Star a repository</Dialog.Title>
              <Dialog.Description>
                Name of the repository: (:owner/:repo)
              </Dialog.Description>
              <Dialog.Input
                label="Repository name"
                onChangeText={reponame => this.setState({ reponame })}
                onSubmitEditing={() => this.starRepo(this.state.reponame)}
              />
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            </Dialog.Container>

            {/*Dialogs to unstar*/}
            <Dialog.Container visible={this.state.unstarDialogVisible}>
              <Dialog.Title>Unstar a repository</Dialog.Title>
              <Dialog.Description>
                Name of the repository: (:owner/:repo)
              </Dialog.Description>
              <Dialog.Input
                label="Repository name"
                onChangeText={reponame => this.setState({ reponame })}
                onSubmitEditing={() => this.unstarRepo(this.state.reponame)}
              />
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            </Dialog.Container>

            {/*Parse the data of year which account created*/}
            <Text style={styles.text}>
              Joined {(this.state.data.created_at + '').substring(0, 4)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
