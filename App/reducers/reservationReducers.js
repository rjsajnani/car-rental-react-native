import {
    REQUEST_RESERVATION_LIST
  } from '../actions/consts'

const initialState = {
  reservationList: [],
}

export default function reservationReducers (state= initialState, action) {
	switch(action.type) {
    case REQUEST_RESERVATION_LIST: 
      return {...state, reservationList: action.value, activeList: action.active };
    default: 
      return state;
  }
}
