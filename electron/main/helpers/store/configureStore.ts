const { webContents, ipcMain } = require('electron');
const { combineReducers, createStore, applyMiddleware, compose } = require('redux');
const { isFSA } = require('flux-standard-action');
const { triggerAlias } = require('electron-redux'); //forwardToRenderer,
const { createEpicMiddleware } = require('redux-observable');
const validatePermissionAction = require('./validatePermissionAction');
const rootEpic = require('../epics');
const rootReducer = require('../reducers');

const epicMiddleware = createEpicMiddleware();


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

 
    // if (action.payload && action.payload.uuid) {
    //   // loop through all action uuid's passed in payload {
    //   let uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid); 
    //   if (uuidObj) {
    //     webContents.fromId(uuidObj.winId).send('redux-action', rendererAction);
    //   }
    //   // }
    //   return next(action);
    // } else {
    //   return next(action);
    // }

    console.log('>>>>>> configure: ', action);
    const allWebContents = webContents.getAllWebContents();
    allWebContents.forEach((contents) => { 
      // console.log('---> contents id: ', contents.id);
      contents.send('redux-action', rendererAction);
    });
    return next(action);
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

      // uuid resolver // move to forwardToRendererWrapper?
      let uuidTargetObj = globalId.find(renObj => renObj.name === payload.payload.targetDapp); // for OPEN_CHANNEL 'dappname128729index2' 
      if (uuidTargetObj) {
        const payloadUuidObj = { 
          uuidRec: uuidTargetObj.id,
          uuidSend: uuid 
        };
        payload.payload = Object.assign(payload.payload, payloadUuidObj) 
      }
      

      store.dispatch(payload);   
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

  epicMiddleware.run(rootEpic);

  replyActionMain(store, globalId); 
  
  return store;
};

module.exports = configureStore;
