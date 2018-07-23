const { combineReducers } = require('redux');

const { counter, countdown } = require('./counter');
const client = require('./client');
const channel = require('./channel');

const rootReducer = combineReducers({
  counter,
  countdown,
  client,
  channel
});

module.exports = rootReducer;
