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
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Username of a GitHub repo to start from.
const gitUserName = 'a2975667';

/*
This is the home screen of the app
should show the repo information
of the user defined above.
*/
class ProfileScreen extends React.Component {
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
  componentDidMount() {
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

  //Renders output on the screen
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.header}
          source={{ uri: 'https://brand.illinois.edu/images/TopImage2019.jpg' }}
        />
        <Image
          style={styles.avatar}
          source={{
            uri: this.state.data.avatar_url,
          }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.data.name}</Text>
            <Text style={styles.username}>{this.state.data.login}</Text>
            <Text style={styles.bio}>{this.state.data.bio}</Text>
            <Text style={styles.link}>{this.state.data.email}</Text>

            <Text
              style={styles.link}
              onPress={() => Linking.openURL(this.state.data.blog)}>
              {this.state.data.blog}
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Repo')}>
              <Text style={styles.count}>
                {this.state.data.public_repos} Repositories
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Follower')}>
              <Text style={styles.count}>
                {this.state.data.followers} Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Following')}>
              <Text style={styles.count}>
                {this.state.data.following} Following
              </Text>
            </TouchableOpacity>
            <Text style={styles.bio}>
              Joined {(this.state.data.created_at + '').substring(0, 4)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

/*
This is the screen that shows
all the repositories of the user
from GitHub API.
*/
class RepoScreen extends React.Component {
  //Set the title of this screen.
  static navigationOptions = {
    title: 'Public Repositories',
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
    fetch('https://api.github.com/users/'.concat(gitUserName).concat('/repos'))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          data: responseJson,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  //Get URL of each repo so that it can be clicked.
  clickEventListener = item => {
    Linking.openURL(item.html_url);
  };

  render() {
    //A table for color of each language. It looks ugly rn I'm sorry I'll fix it.
    var gitColor = {
      Mercury: '#ff2b2b',
      TypeScript: '#2b7489',
      PureBasic: '#5a6986',
      'Objective-C++': '#6866fb',
      Self: '#0579aa',
      edn: '#db5855',
      NewLisp: '#87AED7',
      'Jupyter Notebook': '#DA5B0B',
      Rebol: '#358a5b',
      Frege: '#00cafe',
      Dart: '#00B4AB',
      AspectJ: '#a957b0',
      Shell: '#89e051',
      'Web Ontology Language': '#9cc9dd',
      xBase: '#403a40',
      Eiffel: '#946d57',
      Nix: '#7e7eff',
      RAML: '#77d9fb',
      MTML: '#b7e1f4',
      Racket: '#22228f',
      Elixir: '#6e4a7e',
      SAS: '#B34936',
      Agda: '#315665',
      wisp: '#7582D1',
      D: '#ba595e',
      Kotlin: '#F18E33',
      Opal: '#f7ede0',
      Crystal: '#776791',
      'Objective-C': '#438eff',
      'ColdFusion CFC': '#ed2cd6',
      Oz: '#fab738',
      Mirah: '#c7a938',
      'Objective-J': '#ff0c5a',
      Gosu: '#82937f',
      FreeMarker: '#0050b2',
      Ruby: '#701516',
      'Component Pascal': '#b0ce4e',
      Arc: '#aa2afe',
      Brainfuck: '#2F2530',
      Nit: '#009917',
      APL: '#5A8164',
      Go: '#375eab',
      'Visual Basic': '#945db7',
      PHP: '#4F5D95',
      Cirru: '#ccccff',
      SQF: '#3F3F3F',
      Glyph: '#e4cc98',
      Java: '#b07219',
      MAXScript: '#00a6a6',
      Scala: '#DC322F',
      Makefile: '#427819',
      ColdFusion: '#ed2cd6',
      Perl: '#0298c3',
      Lua: '#000080',
      Vue: '#2c3e50',
      Verilog: '#b2b7f8',
      Factor: '#636746',
      Haxe: '#df7900',
      'Pure Data': '#91de79',
      Forth: '#341708',
      Red: '#ee0000',
      Hy: '#7790B2',
      Volt: '#1F1F1F',
      LSL: '#3d9970',
      eC: '#913960',
      CoffeeScript: '#244776',
      HTML: '#e44b23',
      Lex: '#DBCA00',
      'API Blueprint': '#2ACCA8',
      Swift: '#ffac45',
      C: '#555555',
      AutoHotkey: '#6594b9',
      Isabelle: '#FEFE00',
      Metal: '#8f14e9',
      Clarion: '#db901e',
      JSONiq: '#40d47e',
      Boo: '#d4bec1',
      AutoIt: '#1C3552',
      Clojure: '#db5855',
      Rust: '#dea584',
      Prolog: '#74283c',
      SourcePawn: '#5c7611',
      AMPL: '#E6EFBB',
      FORTRAN: '#4d41b1',
      ANTLR: '#9DC3FF',
      Harbour: '#0e60e3',
      Tcl: '#e4cc98',
      BlitzMax: '#cd6400',
      PigLatin: '#fcd7de',
      Lasso: '#999999',
      ECL: '#8a1267',
      VHDL: '#adb2cb',
      Elm: '#60B5CC',
      'Propeller Spin': '#7fa2a7',
      X10: '#4B6BEF',
      IDL: '#a3522f',
      ATS: '#1ac620',
      Ada: '#02f88c',
      'Unity3D Asset': '#ab69a1',
      Nu: '#c9df40',
      LFE: '#004200',
      SuperCollider: '#46390b',
      Oxygene: '#cdd0e3',
      ASP: '#6a40fd',
      Assembly: '#6E4C13',
      Gnuplot: '#f0a9f0',
      JFlex: '#DBCA00',
      NetLinx: '#0aa0ff',
      Turing: '#45f715',
      Vala: '#fbe5cd',
      Processing: '#0096D8',
      Arduino: '#bd79d1',
      FLUX: '#88ccff',
      NetLogo: '#ff6375',
      'C Sharp': '#178600',
      CSS: '#563d7c',
      'Emacs Lisp': '#c065db',
      Stan: '#b2011d',
      SaltStack: '#646464',
      QML: '#44a51c',
      Pike: '#005390',
      LOLCODE: '#cc9900',
      ooc: '#b0b77e',
      Handlebars: '#01a9d6',
      J: '#9EEDFF',
      Mask: '#f97732',
      EmberScript: '#FFF4F3',
      TeX: '#3D6117',
      Nemerle: '#3d3c6e',
      KRL: '#28431f',
      "Ren'Py": '#ff7f7f',
      'Unified Parallel C': '#4e3617',
      Golo: '#88562A',
      Fancy: '#7b9db4',
      OCaml: '#3be133',
      Shen: '#120F14',
      Pascal: '#b0ce4e',
      'F#': '#b845fc',
      Puppet: '#302B6D',
      ActionScript: '#882B0F',
      Diff: '#88dddd',
      'Ragel in Ruby Host': '#9d5200',
      Fantom: '#dbded5',
      Zephir: '#118f9e',
      Click: '#E4E6F3',
      Smalltalk: '#596706',
      DM: '#447265',
      Ioke: '#078193',
      PogoScript: '#d80074',
      LiveScript: '#499886',
      JavaScript: '#f1e05a',
      VimL: '#199f4b',
      PureScript: '#1D222D',
      ABAP: '#E8274B',
      Matlab: '#bb92ac',
      Slash: '#007eff',
      R: '#198ce7',
      Erlang: '#B83998',
      Pan: '#cc0000',
      LookML: '#652B81',
      Eagle: '#814C05',
      Scheme: '#1e4aec',
      PLSQL: '#dad8d8',
      Python: '#3572A5',
      Max: '#c4a79c',
      'Common Lisp': '#3fb68b',
      Latte: '#A8FF97',
      XQuery: '#5232e7',
      Omgrofl: '#cabbff',
      XC: '#99DA07',
      Nimrod: '#37775b',
      SystemVerilog: '#DAE1C2',
      Chapel: '#8dc63f',
      Groovy: '#e69f56',
      Dylan: '#6c616e',
      E: '#ccce35',
      Parrot: '#f3ca0a',
      'Grammatical Framework': '#79aa7a',
      'Game Maker Language': '#8fb200',
      Papyrus: '#6600cc',
      'NetLinx+ERB': '#747faa',
      Clean: '#3F85AF',
      Alloy: '#64C800',
      Squirrel: '#800000',
      PAWN: '#dbb284',
      UnrealScript: '#a54c4d',
      'Standard ML': '#dc566d',
      Slim: '#ff8f77',
      Perl6: '#0000fb',
      Julia: '#a270ba',
      Haskell: '#29b544',
      NCL: '#28431f',
      Io: '#a9188d',
      Rouge: '#cc0088',
      cpp: '#f34b7d',
      'AGS Script': '#B9D9FF',
      Dogescript: '#cca760',
      nesC: '#94B0C7',
    };

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
                  { borderColor: gitColor[item.language] },
                ]}
                onPress={() => {
                  this.clickEventListener(item);
                }}>
                <View style={styles.repoCardContent}>
                  <Text style={styles.repoDescription}>{item.owner.login}</Text>
                  <Text style={styles.repoName}>{item.name}</Text>
                  <Text style={styles.repoDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

/*
This is the screen that shows
all the followers of the user.
(Currently empty)
*/
class FollowerScreen extends React.Component {
  static navigationOptions = {
    title: 'Followers',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Follower</Text>
      </View>
    );
  }
}

/*
This is the screen that shows
all the users that this user
is following.
(Currently empty)
*/
class FollowingScreen extends React.Component {
  static navigationOptions = {
    title: 'Following',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Following</Text>
      </View>
    );
  }
}

/*
Navigators that controlls
all the screens in this app.
*/
const RootStack = createStackNavigator(
  {
    Home: ProfileScreen,
    Repo: RepoScreen,
    Follower: FollowerScreen,
    Following: FollowingScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

/*
StyleSheet that defines all the
styles used in this app.
*/
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    marginTop: 10,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#23292E',
    fontWeight: '600',
  },
  username: {
    fontSize: 16,
    color: '#666666',
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: '#23292E',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  count: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 150,
    borderRadius: 30,
    backgroundColor: '#D0D0D0',
  },
  repoContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  repoLists: {
    flex: 1,
  },
  repoCardContent: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  repoCard: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#eeeeee',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 6,
  },
  repoName: {
    fontSize: 18,
    flex: 1,
    color: '#008080',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  repoDescription: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginBottom: 5,
  },
});
