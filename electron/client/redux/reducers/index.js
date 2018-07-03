import { combineReducers } from 'redux';
import { counter, countdown } from './counter';
import { client } from './client';

const rootReducer = combineReducers({
  counter,
  countdown,
  client 
});

export default rootReducer;
