import { combineReducers } from 'redux';
import { counter, countdown } from './counter';
// const client = require('./client');

const rootReducer = combineReducers({
  counter,
  countdown 
});
//,client
export default rootReducer;
