// *** working with redux, get and post data to ipc through

// var assert = require('assert');
// var redux = require('redux');
// var createStore = redux.createStore;

// var reducer = function(state, action) {
//   if (!state) state = 0;
//   if (action.type === 'INC') return state + 1;
//   return state;
// }

// var store = createStore(reducer);

// assert.equal(store.getState(), 0)

// store.dispatch({type: 'INC'});

// assert.equal(store.getState(), 1);

// if (global.document) {
//   document.write('My number is ' + store.getState());
// }

//***** define redux, redux-thunk with browserify */
const redux = electron.remote.require('redux');
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const compose = redux.compose;
// { combineReducers, createStore, applyMiddleware, compose } 
const thunk = electron.remote.require('redux-thunk').default;
// const { hashHistory } = electron.remote.require('react-router');
// const { routerMiddleware } = electron.remote.require('react-router-redux');
const { isFSA } = electron.remote.require('flux-standard-action');

const validateAction = (action) => {
  if (!isFSA(action)) {
    // log('WARNING! Action not FSA-compliant', action);

    return false;
  }
  return true;
}

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      return state + 1;
    case 'DECREMENT_COUNTER':
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter
});

const configureStore = (initialState) => {

  const middleware = [thunk, forwardToMain];
  const enhanced = [
    applyMiddleware(...middleware),
  ];
  const enhancer = compose(...enhanced);
  
  console.log(redux.createStore);
  console.log(typeof rootReducer, initialState, typeof enhancer);
  const store = createStore(rootReducer, initialState, enhancer);  
   
  // replayActionRenderer(store); // window.ipc

  return store;
};

const forwardToMain = store => next => (action) => {  
  if (!validateAction(action)) return next(action);

  if (
    action.type.substr(0, 2) !== '@@'
    && action.type.substr(0, 10) !== 'redux-form'
    && (
      !action.meta
      || !action.meta.scope
      || action.meta.scope !== 'local'
    )
  ) {

    // sendToMainAction(action); // window.ipc  /**** access from preload script */ 
      
    // stop action in-flight
    // eslint-disable-next-line consistent-return
    return;
  }

  // eslint-disable-next-line consistent-return
  return next(action);
};

const enableStore = () => {
  
  // const states = getGlobalState(); // window.ipc 
  const initialState = JSON.parse(states());//getInitialStateRenderer(); // ???
   
  const store = configureStore(initialState);
  return store;
}
