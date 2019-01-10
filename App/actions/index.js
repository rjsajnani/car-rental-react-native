import firebase from '../../FirebaseConfig';
import {
  REQUEST_CARS_LIST,
  REQUEST_CAR_DETAILS,
  REQUEST_RESERVATION_LIST,
  CONFRIM_BOOKING,
  SAVE_TOKEN,
  GET_TOKEN
} from './consts'
import { AsyncStorage } from 'react-native'

import Moment from 'moment';

//get the car lists
const getCarsList = (carsList) => {
  return {
    type: REQUEST_CARS_LIST,
    value: carsList
  };
};

//get car details
const getCarDetails = (carDetails) => {
  return {
    type: REQUEST_CAR_DETAILS,
    value: carDetails
  }
}

//update once booking is confirmed
const updateBooking = () => {
  return {
    type: CONFRIM_BOOKING,
    value: []
  }
}

//get reservation lists
const getReservationList = (reservationList, activeList) => {
  return {
    type: REQUEST_RESERVATION_LIST,
    value: reservationList,
    active: activeList
  }
}

//function to update the state of the car booked and also add the car to reservation list
const confirmBooking = (values) => {
  return function(dispatch) {
    firebase.firestore().collection('cars').doc(values.key).update({
      availability: !values.availability,
    })
    firebase.firestore().collection('reservations').add({
      id: values.key,
      startTime: values.startTime,
      endTime: values.endTime,
      name: values.name,
      active: true,
      location: values.location,
      image_url: values.image_url,
      token: values.token
    })
    var actionCompleteBooking = updateBooking();
    dispatch(actionCompleteBooking);
  }
}

// check for any chnages or to get the car list 
const watchCarsList = () => {
  return function(dispatch) {
    firebase.firestore().collection("cars").onSnapshot(function(querySnapshot) {
      const carsList = []
      querySnapshot.forEach((doc) => {
        const {
          name,
          location,
          color,
          registration_no,
          image_url,
          availability,
          endTime,
          current_time,
          coordinate
        } = doc.data();
        carsList.push({
          key: doc.id,
          doc, // DocumentSnapshot
          name,
          location,
          color,
          imageUrl: image_url,
          registrationNo: registration_no,
          availability,
          endTime,
          current_time,
          coordinate: {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          }
        });
      })
      var actionGetCarsList = getCarsList(carsList);
      dispatch(actionGetCarsList);
    }, function(error) {
      console.log(error);
    });
  }
};

//get the car details by passing the correct key
const fetchCarDetails = (carId) => {
  return function(dispatch) {
    firebase.firestore().collection("cars").doc(carId).get().then((doc) => {
      let details = doc.data()
      carDetails = {
        details: doc.data(),
        key: details.id,
        startTime: Moment(),
        endTime: Moment().add(`${details.rental_time}`, 'hours'),
      }
      var actionCarDetails = getCarDetails(carDetails);
      dispatch(actionCarDetails);
    }, function(error) {
      console.log(error);
    });
  }
};


// toggle bewteen active and inactive 
const watchReservationList = (val,token) => {
  let activeList = val === undefined ? false : val
  const reservationList = []
  return function(dispatch) {
    if (activeList) {
      firebase.firestore().collection("reservations").where("active", "==", true).where("token", "==", token).onSnapshot(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
          const {
            endTime,
            startTime,
            color,
            active,
            image_url,
            name,
            location,
            token
          } = doc.data();
          reservationList.push({
            key: doc.id,
            doc, // DocumentSnapshot
            name,
            location,
            color,
            imageUrl: image_url,
            active,
            endTime,
            startTime,
            token
          });
        })
        var actionGetReservationList = getReservationList(reservationList, activeList);
        dispatch(actionGetReservationList);
      }, function(error) {
        console.log(error);
      });
    } else {
      firebase.firestore().collection("reservations").where("token", "==", token).onSnapshot(function(querySnapshot) {
        const reservationList = []
        querySnapshot.forEach((doc) => {
          const {
            endTime,
            startTime,
            color,
            active,
            image_url,
            name,
            location,
            token
          } = doc.data();
          reservationList.push({
            key: doc.id,
            doc, // DocumentSnapshot
            name,
            location,
            color,
            imageUrl: image_url,
            active,
            endTime,
            startTime,
            token
          });
        })
        var actionGetReservationList = getReservationList(reservationList, activeList);
        dispatch(actionGetReservationList);
      }, function(error) {
        console.log(error);
      });
    }
  }
};


// save and get access token

const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token: token
});

const getToken = (token) => ({
  type: GET_TOKEN,
  token: token,
});

const error = error => ({
  type: 'ERROR',
  error,
});


const saveUserToken = (data) => dispatch =>
  AsyncStorage.setItem('userToken', data)
  .then((data) => {
    dispatch(saveToken('token saved'));
  })
  .catch((err) => {
    dispatch(error(err.message || 'ERROR'));
  })

const getUserToken = () => dispatch =>
  AsyncStorage.getItem('userToken')
  .then((data) => {
    dispatch(getToken(data));
  })
  .catch((err) => {
    dispatch(error(err.message || 'ERROR'));
  })


export {
  getCarsList,
  watchCarsList,
  getCarDetails,
  fetchCarDetails,
  watchReservationList,
  getReservationList,
  confirmBooking,
  saveUserToken,
  getUserToken,
};