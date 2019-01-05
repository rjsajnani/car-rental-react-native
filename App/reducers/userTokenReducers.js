import {
  SAVE_TOKEN, GET_TOKEN
} from '../actions/consts'

const initialState = {
  token:'',  
}

export default function userTokenReducers (state= initialState, action) {
  switch(action.type) {
    case GET_TOKEN:
      return { ...state, token: action.token };
    case SAVE_TOKEN:
      return { ...state, token: action.token };
    default: 
      return state;
  }
}
