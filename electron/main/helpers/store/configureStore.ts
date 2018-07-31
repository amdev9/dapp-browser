import { webContents, ipcMain } from 'electron';
import { createStore, applyMiddleware, compose, Store, Middleware, GenericStoreEnhancer, Dispatch } from 'redux';
import { isFSA } from 'flux-standard-action';
// import { triggerAlias } from 'electron-redux'; 
import { createEpicMiddleware } from 'redux-observable';
import { validatePermissionAction } from './validatePermissionAction';
import rootEpic from '../epics';
import { rootReducer } from '../reducers';
import { RendererConf } from '../../createDappView';

export type State = {
  readonly counter: number;
  readonly countdown: number;
};

export interface Action {
  type: string;
  payload?: {
    uuid?: string
  };
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
      getReduxState: () => string,
      state: State
    }
  }
}

const epicMiddleware = createEpicMiddleware();

const validateAction = (action: Action) => {
  return isFSA(action);
}
  
const forwardToRendererWrapper = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<void>) => <A extends Action>(action: A) => {
    if (!validateAction(action)) return next(action);
    if (action.meta && action.meta.scope === 'local') return next(action);

    // change scope to avoid endless-loop
    const rendererAction = Object.assign({}, action, { 
      meta: {
        ...action.meta,
        scope: 'local',
      }
    });
  

    if (action.type == 'INTENT_OPEN_CHANNEL') {
      // add receiverUUID as intent to senderUUID into globalId
  
    }
    // console.log('>>>>>> configure: ', action); //todo - add bind to globalid on BIND_OPEN_CHANNELS - register it once
    if (action.type == 'OPEN_CHANNEL') {
      let uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid); 
      console.log('OPEN_CHANNEL ---> ', uuidObj);
      testChannel(uuidObj.winId);
    }
    
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
  };
}

const testChannel = (webId: number) => {
  // ipcMain.on('testChannel2', (event: Electron.Event, payload: object) => {
  //   console.log('testChannel2', payload);
  // });
  ipcMain.on('testChannel1', (event: Electron.Event, payload: object) => {
    console.log('testChannel1', payload);
    webContents.fromId(webId).send('testChannel2', 'propagate');
  });
}

const replyActionMain = (store: Store<{}>, globalId: RendererConf[]) => {
  global.getReduxState = () => JSON.stringify(store.getState());
  ipcMain.on('redux-action', (event: Electron.Event, uuid: string, payload: any) => {

    let uuidObj = globalId.find(renObj => renObj.id === uuid);
    if (uuidObj) {
      const statusObj = { status: uuidObj.status };
      payload.payload = (payload.payload) ? Object.assign(payload.payload, statusObj) : statusObj;

      // uuid resolver 
      let uuidTargetObj = globalId.find(renObj => renObj.name === payload.payload.targetDapp); 
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

export const configureStore = (initialState?: State, globalId?: RendererConf[]) => {
  const middleware: Middleware[] = [];
  middleware.push(epicMiddleware, validatePermissionAction, forwardToRendererWrapper(globalId));
  const enhanced = [applyMiddleware(...middleware)];
  const enhancer: GenericStoreEnhancer = compose(...enhanced);
  const store = createStore(rootReducer, initialState, enhancer);
  epicMiddleware.run(rootEpic);
  replyActionMain(store, globalId);
  return store;
};
