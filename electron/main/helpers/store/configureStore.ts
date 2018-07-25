import { webContents, ipcMain } from 'electron';
import { combineReducers, createStore, applyMiddleware, compose, Store, Middleware, StoreEnhancer, Dispatch } from 'redux';
 
import { isFSA } from 'flux-standard-action';
 

// import { triggerAlias } from 'electron-redux'; 
import { createEpicMiddleware } from 'redux-observable';
import { validatePermissionAction } from './validatePermissionAction';
import rootEpic from '../epics';
import { rootReducer } from '../reducers';
import { RendereConf } from '../../createDappView';

export type State = {
  readonly counter: number;
  readonly countdown: number;
};

export interface Action {
  type: string;
  payload?: {};
  meta?: {
    scope?: string
  };
}

export const initialState: State = {
  counter: 0,
  countdown: 0
}; 

declare global {
  namespace NodeJS {
    interface Global {
      getReduxState: () => string
    }
  }
}

const epicMiddleware = createEpicMiddleware();

const validateAction = (action: Action) => {
  return isFSA(action);
}

// const forwardToRendererWrapper = (globalId: RendereConf[]) => {
  // return () => next => (action) => {
    // console.log('globalId', globalId);
     
  const forwardToRendererWrapper: Middleware = () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    
    // Middleware = () => next => (action) => {
    if (!validateAction(action)) return next(action);
    if (action.meta && action.meta.scope === 'local') return next(action);

    // change scope to avoid endless-loop

    const rendererAction = Object.assign({}, action, { meta: {
        ...action.meta,
        scope: 'local',
      }}
    );
    
    // {
    //   ...action,
    //   meta: {
    //     ...action.meta,
    //     scope: 'local',
    //   },
    // };
 
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
// }

const replyActionMain = (store: Store<{}>, globalId: RendereConf[]) => {
  global.getReduxState = () => JSON.stringify(store.getState());
  ipcMain.on('redux-action', (event: Electron.Event, uuid: string, payload: any) => {
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

export const configureStore = (initialState?: State, globalId?: RendereConf[]) => {
  const middleware: any[] = []; //todo
  middleware.push(epicMiddleware, validatePermissionAction, forwardToRendererWrapper); // 
  const enhanced = [applyMiddleware(...middleware)]; 
  const enhancer: any = compose(...enhanced); //todo
  const store: Store<{}> = createStore(rootReducer, initialState, enhancer); //todo fix Store<{}>

  epicMiddleware.run(rootEpic);

  replyActionMain(store, globalId); 
  
  return store;
};

 
