const { combineReducers } = require('redux');

const channel = require('./channel');
const counter = require('./counter');
 
const rootReducer = combineReducers({
  counter,
  channel
});

module.exports = rootReducer;
