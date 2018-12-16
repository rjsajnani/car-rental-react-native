import {
  REQUEST_CARS_LIST
} from '../actions/consts'  
const initialState = {
	carsList: [],
}


export default function carListReducers (state= initialState, action) {
	switch(action.type) {
    case REQUEST_CARS_LIST: 
      return { ...state, carsList: action.value };
    default: 
      return state;
  }
}
