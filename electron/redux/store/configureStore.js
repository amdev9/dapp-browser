const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
const thunk = require('redux-thunk').default;
// const { hashHistory } = require('react-router');
// const { routerMiddleware } = require('react-router-redux');
const { isFSA } = require('flux-standard-action');
const { forwardToRenderer, triggerAlias } = require('electron-redux');

// const { createEpicMiddleware } = require('redux-observable');
// const { rootEpic } = require('../epics');

const rootReducer = require('../reducers');
const validatePermissionAction = require('./validatePermissionAction');

 

const replayActionMain = (store, globalId) => {
  
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (event, uuid, payload) => { 
    

    // let arr = [
    //   { name:"string 1", value:"this", other: "that" },
    //   { name:"string 2", value:"this", other: "that" }
    // ];
    // let obj = arr.find(o => o.name === 'string 1');
    // console.log(obj);
    

    let uuidObj = globalId.find(renObj => renObj.id === uuid);
    if (uuidObj) {
      // console.log("Validated: ", JSON.stringify(uuidObj));


      // console.log('payload', payload);
      const statusObj = { status: uuidObj.status };
      payload.payload = (payload.payload) ? Object.assign(payload.payload, statusObj) : statusObj;
      
      // payload.status = uuidObj.status;

 
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
  
  // const epicMiddleware = createEpicMiddleware(rootEpic);
  // const router = routerMiddleware(hashHistory);
    
  middleware.push(triggerAlias, validatePermissionAction, forwardToRenderer); // epicMiddleware
  
  const enhanced = [applyMiddleware(...middleware)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store, globalId); 
  
  return store;
};

module.exports = configureStore;
