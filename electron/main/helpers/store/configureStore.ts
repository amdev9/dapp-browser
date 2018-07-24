import { webContents, ipcMain } from 'electron';
import { combineReducers, createStore, applyMiddleware, compose, Store, Action, Middleware, StoreEnhancer } from 'redux';
import { isFSA } from 'flux-standard-action';
 
// import { triggerAlias } from 'electron-redux'; 
import { createEpicMiddleware } from 'redux-observable';
import { validatePermissionAction } from './validatePermissionAction';
import rootEpic from '../epics';
import { rootReducer, RootState } from '../reducers';

const epicMiddleware = createEpicMiddleware();

const validateAction = (action: Action) => {
  return isFSA(action);
}

const forwardToRendererWrapper = (globalId: object[]) => {
    
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

const replyActionMain = (store: Store<{}>, globalId: object[]) => {
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

export const configureStore = (initialState?: RootState, globalId?: object[]) => {
  const middleware: Middleware[] = [];
  middleware.push(epicMiddleware, validatePermissionAction, forwardToRendererWrapper(globalId)); // epicMiddleware, triggerAlias, validatePermissionAction 
  const enhanced = [applyMiddleware(...middleware)]; 
  const enhancer = compose(...enhanced);
  const store: Store<{}> = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(rootEpic);

  replyActionMain(store, globalId); 
  
  return store;
};

 
