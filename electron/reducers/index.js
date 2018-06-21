const { combineReducers } = require('redux');

const counter = require('./counter');

const rootReducer = combineReducers({
  counter
  // routing

  //TODO add client state reducer
});

module.exports = rootReducer;
