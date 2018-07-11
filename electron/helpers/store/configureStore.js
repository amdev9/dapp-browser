const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
// const thunk = require('redux-thunk').default; 
const { isFSA } = require('flux-standard-action');
const { triggerAlias } = require('electron-redux'); //forwardToRenderer,
const { createEpicMiddleware } = require('redux-observable');
const rootReducer = require('../reducers');
const validatePermissionAction = require('./validatePermissionAction');

const rootEpic = require('../epics');

const epicMiddleware = createEpicMiddleware(rootEpic);


const validateAction = (action) => {
  return isFSA(action);
}

const forwardToRendererWrapper = (globalId) => {
  
  return () => next => (action) => {
    // console.log('globalId', globalId);
     

    if (!validateAction(action)) return next(action);
    if (action.meta && action.meta.scope === 'local') return next(action);

    // change scope to avoid endless-loop

    const rendererAction = {
      ...action,
      meta: {
        ...action.meta,
        scope: 'local',
      },
    };

    //todo1 
    if (action.payload && action.payload.uuid) {
      // loop through all action uuid's passed in payload {
      let uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid); 
      if (uuidObj) {
        webContents.fromId(uuidObj.winId).send('redux-action', rendererAction);
      }
      // }
      return next(action);
    } else {
      return next(action);
    }

    // console.log('>>>>>> configure: ', action);
    // const allWebContents = webContents.getAllWebContents();
    // allWebContents.forEach((contents) => { 
    //   // console.log('---> contents id: ', contents.id);
    //   contents.send('redux-action', rendererAction);
    // });
    // return next(action);
  };
}

const replyActionMain = (store, globalId) => {
  global.getReduxState = () => JSON.stringify(store.getState());
  ipcMain.on('redux-action', (event, uuid, payload) => {
    let uuidObj = globalId.find(renObj => renObj.id === uuid);
    if (uuidObj) {
      // console.log("Validated: ", JSON.stringify(uuidObj));
      const statusObj = { status: uuidObj.status };
      payload.payload = (payload.payload) ? Object.assign(payload.payload, statusObj) : statusObj;

      // pass by default to dappname128729index2
      let uuidTargetObj = globalId.find(renObj => renObj.name === 'dappname128729index2');
      const payloadUuidObj = { uuid: uuidTargetObj.id };
      payload.payload = Object.assign(payload.payload, payloadUuidObj) 


      store.dispatch(payload);                             // verification for payload 
    } else {
      console.log("Spoofing detected")
    }
  });
}

const configureStore = (initialState, globalId) => {
  const middleware = [];
  middleware.push(epicMiddleware, triggerAlias, validatePermissionAction, forwardToRendererWrapper(globalId)); // 
  const enhanced = [applyMiddleware(...middleware)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replyActionMain(store, globalId); 
  
  return store;
};

module.exports = configureStore;
