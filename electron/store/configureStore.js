const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
const { hashHistory } = require('react-router');
const { routerMiddleware } = require('react-router-redux');
const { isFSA } = require('flux-standard-action');
const { forwardToRenderer, triggerAlias } = require('electron-redux');
const rootReducer = require('../reducers');
const validatePermissionAction = require('./validatePermissionAction');

 

const replayActionMain = (store, globalId) => {
  
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (event, uuid, payload) => { 
    
    if (Object.keys(globalId).includes(uuid)) {
      console.log("Validated: ", globalId[uuid].status)
    
      // + validate spoofing uuid checker 
      // + indentify process (client or dapp)
      // + pass action to redux middleware to check permissions
      store.dispatch(payload);                             // verification for payload 
    } else {
      console.log("Spoofing detected")
    }
   
  });
}

const configureStore = (initialState, globalId) => {
  const middleware = [];
  middleware.push(thunk);
  const router = routerMiddleware(hashHistory);
    
  middleware.push(triggerAlias, validatePermissionAction, forwardToRenderer); // add middleware for permissions verifications
  
  const enhanced = [applyMiddleware(...middleware, router)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store, globalId); 
  
  return store;
};

module.exports = configureStore;
