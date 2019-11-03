import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';

//Imported from package.
import Pie from './js/charts/Pie';
import Theme from './js/theme';

//Use default style sheet.
import styles from './Styles';

type State = {
  activeIndex: number,
};

export default class Visualization extends Component {
  //Set the title of this screen.
  static navigationOptions = {
    title: 'Visualization',
  };

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      loading: true,
      data: [],
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);

    //Parameter passes in name of repo.
    repoName = this.props.navigation.getParam('repoName');
    url = 'https://api.github.com/repos/'
      .concat(gitUserName)
      .concat('/')
      .concat(repoName)
      .concat('/stats/contributors');
    console.log(url);
  }

  //Read repo statistics info from API.
  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          data: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  _onPieItemSelected(newIndex) {
    this.setState({ ...this.state, activeIndex: newIndex });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.repoContainer}>
          <Text style={styles.text}>Contributions by commit counts</Text>
          <Pie
            pieWidth={Dimensions.get('window').width / 2.5}
            pieHeight={Dimensions.get('window').height / 6}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height}
            data={this.state.data}
          />
        </View>
      </ScrollView>
    );
  }
}
