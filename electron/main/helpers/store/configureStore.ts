import { webContents, ipcMain } from 'electron';
import { createStore, applyMiddleware, compose, Store, Middleware, GenericStoreEnhancer, Dispatch } from 'redux';
import { isFSA } from 'flux-standard-action';
// import { triggerAlias } from 'electron-redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore,  persistReducer } from 'redux-persist';

import { validatePermissionAction } from './validatePermissionAction';
import rootEpic from '../epics';
import { rootReducer } from '../reducers';
import { RendererConf } from '../../createDappView';

import { IState } from '../reducers/state';

import SQLiteStorage from './persist';


export interface Action {
  type: string;
  payload?: {
    uuid?: string;
    uuidSend?: string;
    uuidRec?: string;
    status?: string;
  };
  meta?: {
    scope?: string,
    targetUUID: string;
  };
}

export const initialState: IState = {
  channel: {},
  client: {
    activeDapp: {
      appName: null
    },
    isHome: true,
    notification: {isOpen: false},
    loader: {isOpen: false},
    statusBar: {isOpen: false, isPeersOpen: false},
    search: {isOpen: false},
    window: {width: 0, height: 0},
    fileDialog: {isOpen: false}
  },
  feed: {},
  permissionManager: {isOpen: true, permissions: {}, grantedApps: []},
  tray: {items: []},
};

declare global {
  namespace NodeJS {
    interface Global {
      getReduxState: () => string,
      state: IState
    }
  }
}

interface uuidChannelMap {
  uuid: string;
  channel: string;
}
let uuidChannelMapList: Array<uuidChannelMap>;

const epicMiddleware = createEpicMiddleware();

const validateAction = (action: Action) => {
  return isFSA(action);
}

const targetWebContents = (targetId: number) => {
  const allWebContents = webContents.getAllWebContents();
  // console.log('webContents chrome proc Id\'s: ', allWebContents.map((contents) => contents.getProcessId()) );
  const targetContents = allWebContents.find(contents => contents.getProcessId() === targetId);
  return targetContents;
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

    if (action.type == 'INTENT_OPEN_CHANNELS') {

      uuidChannelMapList = [
        {
          uuid: action.payload.uuidSend,
          channel: 'testChannel1'
        },
        {
          uuid: action.payload.uuidRec,
          channel: 'testChannel2'
        }
      ];

      globalId.forEach(function(renObj, i, arr) {
        if (renObj.id == action.payload.uuidSend) {
          arr[i].intent = action.payload.uuidRec;
        }
        if (renObj.id == action.payload.uuidRec) {
          arr[i].intent = action.payload.uuidSend;
        }
      });
    }

    if (action.type == 'OPEN_CHANNEL') {
      let uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid);
      let intentObj = globalId.find(renObj => renObj.id === uuidObj.intent);
      const channelSender = uuidChannelMapList.find(uuidChannelMap => uuidChannelMap.uuid == uuidObj.id).channel;
      const channelReceiver = uuidChannelMapList.find(uuidChannelMap => uuidChannelMap.uuid == uuidObj.intent).channel;
      bindChannel(intentObj.winId, channelReceiver, channelSender);
    }

    const targetUUID = action.payload && action.payload.uuid || action.meta && action.meta.targetUUID

    if (targetUUID) {
      // loop through all action uuid's passed in payload {
      let uuidObj = globalId.find(renObj => renObj.id === targetUUID);
      if (uuidObj) {
        const resolver = targetWebContents(uuidObj.winId);
        // console.log(resolver);
        if (resolver) {
          const copyAction = Object.assign({}, rendererAction)

          if (copyAction.meta && copyAction.meta.targetUUID){
            delete copyAction.meta.targetUUID
          }

          resolver.send('redux-action', copyAction);

        } else {
          console.log('resolver error: ', 'action message lost');
          return next(action);
        }
      }
      // }
      return next(action);
    } else {
      const allWebContents = webContents.getAllWebContents();
      allWebContents.forEach((contents) => {
        // console.log('---> contents id: ', contents.id);
        contents.send('redux-action', rendererAction);
      });
      return next(action);
    }

    // const allWebContents = webContents.getAllWebContents();
    // allWebContents.forEach((contents) => {
    //   // console.log('---> contents id: ', contents.id);
    //   contents.send('redux-action', rendererAction);
    // });
    // return next(action);

  };
}

const bindChannel = (webId: number, channelReceiver: string, channelSender: string) => {
  ipcMain.on(channelSender, (event: Electron.Event, payload: string) => {
    const bindResolver = targetWebContents(webId);
    if (bindResolver) {
      bindResolver.send(channelReceiver, payload);
    } else {
      console.log('resolver error: ', 'message lost');
    }

  });
}

const replyActionMain = (store: Store<{}>, globalId: RendererConf[]) => {
  global.getReduxState = () => JSON.stringify(store.getState());
 
  ipcMain.on('redux-action', (event: Electron.Event, uuid: string, action: any) => {
    const uuidObj = globalId.find(renObj => renObj.id === uuid);
 
    if (uuidObj) {
      const statusObj = { status: uuidObj.status };
      const sourceUUID = { sourceUUID: uuid }
      action.payload = (action.payload) ? Object.assign(action.payload, statusObj) : statusObj;
      action.meta = action.meta ? Object.assign(action.meta, sourceUUID) : sourceUUID
      // uuid resolver
 
      const uuidTargetObj = globalId.find(renObj => renObj.name === action.payload.targetDapp && renObj.status === 'dapp');
 
      if (uuidTargetObj) {
        const payloadUuidObj = {
          uuidRec: uuidTargetObj.id,
          uuidSend: uuid,
        };
 
        action.payload = Object.assign(action.payload, payloadUuidObj)
 
      }
      store.dispatch(action);
    } else {
      console.log("Spoofing detected");
    }
  });
}

export const configureStore = (state: IState = initialState, globalId?: RendererConf[]) => {
  const middleware: Middleware[] = [];
  middleware.push(epicMiddleware, validatePermissionAction(globalId), forwardToRendererWrapper(globalId));
  const enhanced = [applyMiddleware(...middleware)];
  const enhancer: GenericStoreEnhancer = compose(...enhanced);

  const storeEngine = SQLiteStorage({
    database: 'temp/sqliteStorage.db'
  });

  const persistConfig = {
    key: 'root',
    storage: storeEngine, // storage,
    debug: true
  };
  const pReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(pReducer, state, enhancer);
  let persistor = persistStore(store)

  epicMiddleware.run(rootEpic);
  replyActionMain(store, globalId);
  return store;
};
