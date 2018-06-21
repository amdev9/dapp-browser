const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
const { hashHistory } = require('react-router');
const { routerMiddleware } = require('react-router-redux');
const { isFSA } = require('flux-standard-action');
const { forwardToRenderer, triggerAlias } = require('electron-redux');
const rootReducer = require('../reducers');
const validatePermissionAction = require('./validatePermissionAction');

const replayActionMain = (store) => {
  
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (event, uuid, payload) => { 
    
    // 1 validate spoofing uuid checker 
    // 2 indentify process (client or dapp)
    // 3 pass action to redux middleware to check permissions
    store.dispatch(payload);                             // verification for payload 
  });
}

const configureStore = (initialState) => {
  const middleware = [];
  middleware.push(thunk);
  const router = routerMiddleware(hashHistory);
    
  middleware.push(triggerAlias, forwardToRenderer, validatePermissionAction); // add middleware for permissions verifications
  
  const enhanced = [applyMiddleware(...middleware, router)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store); 
  
  return store;
};

module.exports = configureStore;
