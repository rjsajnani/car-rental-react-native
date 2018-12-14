import firebase from '../../FirebaseConfig';
import {REQUEST_CARS_LIST} from './consts'

const carsListCall = firebase.firestore().collection('cars')

export function requestCarsList (){
    const
}