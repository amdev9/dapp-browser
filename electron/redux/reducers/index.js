const { combineReducers } = require('redux');

const { counter, countdown } = require('./counter');
const client = require('./client');

const rootReducer = combineReducers({
  counter,
  countdown,
  client
});

module.exports = rootReducer;
