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
    console.log('globalId', globalId);
     

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

    const allWebContents = webContents.getAllWebContents();

    //todoELECTRON_REDUX loop through all action uuid's passed in payload
    // let uuidObj = globalId.find(renObj => renObj.id === uuid); // uuid from action
    // if (uuidObj) {
    //   webcontents.fromId(uuidObj.windowId).send('redux-action', rendererAction);
    // }

    allWebContents.forEach((contents) => { 
   
      // On dispatch action with propose answer dispatch openchannel(channelId) -> replayToRenderer reply only to renderer with given id
      // fix to filter by passed UUID_RECEIVER_RENDERER - globalUUIDList map UUID_RECEIVER_RENDERER to webcontents id
      // ex: action { type: OPEN_CHANNEL, payload: { channelId: '[CHANNEL_ID]', uuid: '[UUID_RECEIVER_RENDERER]'} 
      // ex.2: action { type: BIND_OPEN_CHANNELS, payload: { channelIds: ['[CHANNEL_ID_1]', '[CHANNEL_ID_2]'] } 
      // ex.3: action { type: BIND_OPEN_CHANNELS_DONE, payload: { bindChannelId: '[BIND_CHANNLE_ID]', uuid: ['[UUID_RECEIVER_RENDERER_1]', '[UUID_RECEIVER_RENDERER_2]'] }  
      // ex.4: action { type: CANCEL_OPENED_CHANNEL }
      // ex.5: action { type: INTENT_OPEN_CHANNELS, channelProposal: "[PERMISSION/PROPOSAL]", targetDapp: "[TARGET_DAPP_NAME]" }
      //next todo use for local redux client staff
      // meta: {
      //   scope: 'local',
      // },

      console.log('---> contents id: ', contents.id);
      contents.send('redux-action', rendererAction);
    });

    return next(action);
  };
}

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
  middleware.push(epicMiddleware, triggerAlias, validatePermissionAction, forwardToRendererWrapper(globalId)); // 
  const enhanced = [applyMiddleware(...middleware)]; 
  const enhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);

  replayActionMain(store, globalId); 
  
  return store;
};

module.exports = configureStore;
