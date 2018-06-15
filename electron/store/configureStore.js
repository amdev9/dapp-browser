const { createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
const { hashHistory } = require('react-router');
const { routerMiddleware } = require('react-router-redux');

const {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} = require('electron-redux');
const rootReducer = require('../reducers');

const configureStore = (initialState) => {
  const middleware = [];
  middleware.push(thunk);
  const router = routerMiddleware(hashHistory);
 
  middleware.push(triggerAlias, forwardToRenderer); // add middleware for permissions verifications

  const enhanced = [applyMiddleware(...middleware, router)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store); // verification for payload, use custom electron-redux like decision
   
  return store;
};

module.exports = configureStore;