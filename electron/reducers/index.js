const { combineReducers } = require('redux');

const counter = require('./counter');
const client = require('./client');

const rootReducer = combineReducers({
  counter,
  client
  // routing

  //TODO add client state reducer
});

module.exports = rootReducer;
