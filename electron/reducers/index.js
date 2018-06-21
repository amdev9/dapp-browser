const { combineReducers } = require('redux');

const counter = require('./counter');
const client = require('./client');

const rootReducer = combineReducers({
  counter,
  client
});

module.exports = rootReducer;
