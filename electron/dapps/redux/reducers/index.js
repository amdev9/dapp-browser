const { combineReducers } = require('redux');

const counter = require('./counter');
 

const rootReducer = combineReducers({
  counter
});

module.exports = rootReducer;
