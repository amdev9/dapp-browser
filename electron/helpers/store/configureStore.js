const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
// const thunk = require('redux-thunk').default; 
const { isFSA } = require('flux-standard-action');
const { forwardToRenderer, triggerAlias } = require('electron-redux'); //todoELECTRON_REDUX add custom forward renderer
const { createEpicMiddleware } = require('redux-observable');
const rootReducer = require('../reducers');
const validatePermissionAction = require('./validatePermissionAction');

const rootEpic = require('../epics');

const epicMiddleware = createEpicMiddleware(rootEpic);

const replayActionMain = (store, globalId) => {
  global.getReduxState = () => JSON.stringify(store.getState());
  ipcMain.on('redux-action', (event, uuid, payload) => {
    let uuidObj = globalId.find(renObj => renObj.id === uuid);
    if (uuidObj) {
      console.log("Validated: ", JSON.stringify(uuidObj));
      const statusObj = { status: uuidObj.status };
      payload.payload = (payload.payload) ? Object.assign(payload.payload, statusObj) : statusObj;
      store.dispatch(payload);                             // verification for payload 
    } else {
      console.log("Spoofing detected")
    }
  });
}

const configureStore = (initialState, globalId) => {
  const middleware = [];
  middleware.push(epicMiddleware, triggerAlias, validatePermissionAction, forwardToRenderer); // 
  const enhanced = [applyMiddleware(...middleware)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store, globalId); 
  
  return store;
};

module.exports = configureStore;
