import firebase from 'react-native-firebase';
// import firestore from 'react-native-firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDbbwkZgRGiTE799udN95IFjJUcTjWxK9A",
  authDomain: "carrental-d4760.firebaseapp.com",
  databaseURL: "https://carrental-d4760.firebaseio.com",
  projectId: "carrental-d4760",
  storageBucket: "carrental-d4760.appspot.com",
  messagingSenderId: "937634451549"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;