import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index'
import thunkMiddleware from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };
