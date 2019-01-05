import { combineReducers } from 'redux';
import carListReducers from './carListReducers'
import carDetailsReducers from './carDetailsReducers';
import reservationReducers from './reservationReducers';
import userTokenReducers from './userTokenReducers';

export default combineReducers({
    userTokenReducers,
    carListReducers,
    carDetailsReducers,
    reservationReducers,
})