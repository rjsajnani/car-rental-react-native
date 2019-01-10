import React from 'react';
import {
  Text,
  StyleSheet,
  View,  
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper'
import firebase from 'react-native-firebase'

import { saveUserToken } from '../../actions/index'


const mapStateToProps = (state) => {
  return{
    token: state.token
  }
};


const mapDispatchToProps = dispatch => ({
  saveUserToken: (val) => dispatch(saveUserToken(val)),
});

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button mode="contained" onPress={this._signInAsync}>
          <Text>Sign in!</Text>
        </Button>
      </View>
    );
  }

  _signInAsync = () => {
    firebase.messaging().getToken()
    .then(fcmToken => {
      if (fcmToken) {
      // user has a device token
      this.props.saveUserToken(fcmToken)
        .then(() => {
            this.props.navigation.navigate('App');
        })
        .catch((error) => {
            this.setState({ error })
        })
      } 
    });
  };

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default  connect(mapStateToProps, mapDispatchToProps)(SignInScreen);