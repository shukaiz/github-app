import React, { StyleSheet } from 'react-native';

/*
StyleSheet that defines all the
styles used in this app.
*/
export default StyleSheet.create({
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
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  body: {
    flex: 1,
    marginTop: 30,
  },
  bodyContent: {
    flex: 1,
    marginTop: 5,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    padding: 30,
  },
  opsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 28,
    color: '#23292E',
    fontWeight: '600',
  },
  username: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 5,
  },
  opsText: {
    fontSize: 16,
    color: '#358080',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
    textDecorationLine: 'underline',
  },
  link: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 150,
    borderRadius: 30,
    backgroundColor: '#D0D0D0',
  },
  repoContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  repoLists: {
    flexGrow: 1,
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
  userListContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  userList: {
    flexGrow: 1,
  },
  userElement: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
  },
  userFullName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#23292E',
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  userAccountName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666666',
    marginLeft: 0,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
});
