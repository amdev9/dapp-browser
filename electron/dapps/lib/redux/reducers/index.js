const { combineReducers } = require('redux');

const channel = require('./channel');
 
const rootReducer = combineReducers({
  channel
});

module.exports = rootReducer;
