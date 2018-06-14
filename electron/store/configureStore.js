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

const configureStore = (initialState, scope = 'main') => {
  const middleware = [];
  middleware.push(thunk);
  const router = routerMiddleware(hashHistory);
  if (scope === 'renderer') {
    middleware.push(forwardToMain, router);
  }

  if (scope === 'main') {
    middleware.push(triggerAlias, forwardToRenderer);
  }

  const enhanced = [applyMiddleware(...middleware, router)];
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
};

module.exports = configureStore;