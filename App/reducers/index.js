import { combineReducers } from 'redux';
import carListReducers from './carListReducers'
import carDetailsReducers from './carDetailsReducers';
import reservationReducers from './reservationReducers';

export default combineReducers({
    carListReducers,
    carDetailsReducers,
    reservationReducers,
})