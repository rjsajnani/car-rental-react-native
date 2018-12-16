import {
    REQUEST_CAR_DETAILS, CONFRIM_BOOKING
  } from '../actions/consts'

const initialState = {
    carDetails: [],
}


export default function carDetailsReducers (state= initialState, action) {
	switch(action.type) {
    case REQUEST_CAR_DETAILS: 
      return {carDetails: action.value };
    case CONFRIM_BOOKING:
      return {carDetails: []}
    default: 
      return state;
  }
}
