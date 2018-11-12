import { webContents, ipcMain } from 'electron';
import { createStore, applyMiddleware, compose, Store, Middleware, Dispatch } from 'redux';
import { isFSA } from 'flux-standard-action';
// import { triggerAlias } from 'electron-redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore,  persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import { validatePermissionAction } from './validatePermissionAction';
import rootEpic from '../epics';
import { rootReducer } from '../reducers';
import { RendererConf } from '../../createDappView';
import { Client, IState } from '../reducers/state';
import SQLiteStorage from './persist';
import { SearchPanel, StatusBarPanel, NotificationPanel } from '../../../client/redux/reducers/state'; // todo remove the references to client

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
    sourceUUID: string;
    targetUUID: string;
    name: string;
  };
}

const statusBarInitialState: StatusBarPanel = {
  items: {
    'Russia, Moscow': {
      status: 0,
      peers: 25,
      name: 'Russia, Moscow',
      nodesTotal: 56430,
      nodes: 76,
      timeTotal: 120000,
      time: 28000,
    },
    'Germany, Berlin': {
      status: 1,
      peers: 34,
      name: 'Germany, Berlin',
      nodesTotal: 26530,
      nodes: 457,
      timeTotal: 120000,
      time: 66000,
    },
    'Germany, Berlin123': {
      status: 1,
      peers: 34,
      name: 'Germany, Berlin123',
      nodesTotal: 26530,
      nodes: 457,
      timeTotal: 120000,
      time: 66000,
    },
  },
  loggerWrite: false,
};

const searchInitialState: SearchPanel = {
  items:
  {
    applications: [
      {
        icon: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"><defs><style>.cls-1{fill:url(#radial-gradient);}.cls-2{fill:url(#radial-gradient-2);}.cls-3{fill:url(#linear-gradient);}</style><radialGradient id="radial-gradient" cx="133.38" cy="-4.61" r="185.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd0"/><stop offset="0.45" stop-color="#ff7c55"/><stop offset="1" stop-color="#ff00c1"/></radialGradient><radialGradient id="radial-gradient-2" cx="99.29" cy="31.66" r="169.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.39" stop-color="#fff" stop-opacity="0.62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="linear-gradient" x1="-11.54" y1="8.29" x2="87.74" y2="90.95" xlink:href="#radial-gradient-2"/></defs><title>Game_color</title><rect class="cls-1" x="0.41" y="0.41" width="127.18" height="127.18" rx="20" ry="20"/><path class="cls-2" d="M78.9,26H51.22A29.29,29.29,0,0,0,21.93,55.29V99.61c0,4.81,2.78,6,6.18,2.56l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.29,29.29,0,0,0,78.9,26Z"/><path class="cls-3" d="M28.11,102.17l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.21,29.21,0,0,0,96.68,32C51.47,34.28,21.93,60.2,21.93,99.61,21.93,104.42,24.71,105.57,28.11,102.17Z"/></svg>`,
        uri: 'chat://sendMessage/satan/',
        network: 'mainnet',
        app: 'Chat1',
      },
      {
        icon: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"><defs><style>.cls-1{fill:url(#radial-gradient);}.cls-2{fill:url(#radial-gradient-2);}.cls-3{fill:url(#linear-gradient);}</style><radialGradient id="radial-gradient" cx="133.38" cy="-4.61" r="185.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd0"/><stop offset="0.45" stop-color="#ff7c55"/><stop offset="1" stop-color="#ff00c1"/></radialGradient><radialGradient id="radial-gradient-2" cx="99.29" cy="31.66" r="169.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.39" stop-color="#fff" stop-opacity="0.62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="linear-gradient" x1="-11.54" y1="8.29" x2="87.74" y2="90.95" xlink:href="#radial-gradient-2"/></defs><title>Game_color</title><rect class="cls-1" x="0.41" y="0.41" width="127.18" height="127.18" rx="20" ry="20"/><path class="cls-2" d="M78.9,26H51.22A29.29,29.29,0,0,0,21.93,55.29V99.61c0,4.81,2.78,6,6.18,2.56l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.29,29.29,0,0,0,78.9,26Z"/><path class="cls-3" d="M28.11,102.17l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.21,29.21,0,0,0,96.68,32C51.47,34.28,21.93,60.2,21.93,99.61,21.93,104.42,24.71,105.57,28.11,102.17Z"/></svg>`,
        uri: 'exchange://send-file/',
        network: 'testnet',
        app: 'Exchange',
      },
    ],
    marketplace: [
      {
        icon: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"><defs><style>.cls-1{fill:url(#radial-gradient);}.cls-2{fill:url(#radial-gradient-2);}.cls-3{fill:url(#linear-gradient);}</style><radialGradient id="radial-gradient" cx="133.38" cy="-4.61" r="185.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd0"/><stop offset="0.45" stop-color="#ff7c55"/><stop offset="1" stop-color="#ff00c1"/></radialGradient><radialGradient id="radial-gradient-2" cx="99.29" cy="31.66" r="169.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.39" stop-color="#fff" stop-opacity="0.62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="linear-gradient" x1="-11.54" y1="8.29" x2="87.74" y2="90.95" xlink:href="#radial-gradient-2"/></defs><title>Game_color</title><rect class="cls-1" x="0.41" y="0.41" width="127.18" height="127.18" rx="20" ry="20"/><path class="cls-2" d="M78.9,26H51.22A29.29,29.29,0,0,0,21.93,55.29V99.61c0,4.81,2.78,6,6.18,2.56l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.29,29.29,0,0,0,78.9,26Z"/><path class="cls-3" d="M28.11,102.17l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.21,29.21,0,0,0,96.68,32C51.47,34.28,21.93,60.2,21.93,99.61,21.93,104.42,24.71,105.57,28.11,102.17Z"/></svg>`,
        uri: 'chat://marketplace/install?name=Chat',
        network: 'mainnet',
        app: 'Chat',
      },
      {
        icon: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128"><defs><style>.cls-1{fill:url(#radial-gradient);}.cls-2{fill:url(#radial-gradient-2);}.cls-3{fill:url(#linear-gradient);}</style><radialGradient id="radial-gradient" cx="133.38" cy="-4.61" r="185.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd0"/><stop offset="0.45" stop-color="#ff7c55"/><stop offset="1" stop-color="#ff00c1"/></radialGradient><radialGradient id="radial-gradient-2" cx="99.29" cy="31.66" r="169.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="0.39" stop-color="#fff" stop-opacity="0.62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="linear-gradient" x1="-11.54" y1="8.29" x2="87.74" y2="90.95" xlink:href="#radial-gradient-2"/></defs><title>Game_color</title><rect class="cls-1" x="0.41" y="0.41" width="127.18" height="127.18" rx="20" ry="20"/><path class="cls-2" d="M78.9,26H51.22A29.29,29.29,0,0,0,21.93,55.29V99.61c0,4.81,2.78,6,6.18,2.56l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.29,29.29,0,0,0,78.9,26Z"/><path class="cls-3" d="M28.11,102.17l4-4a21.74,21.74,0,0,1,15.37-6.37H78.9a29.29,29.29,0,0,0,29.29-29.29V55.29A29.21,29.21,0,0,0,96.68,32C51.47,34.28,21.93,60.2,21.93,99.61,21.93,104.42,24.71,105.57,28.11,102.17Z"/></svg>`,
        uri: 'chat://marketplace/install?name=Exchange',
        network: 'testnet',
        app: 'Exchange',
      },
    ],
  },
};

// const chatIcon = require('../../../client/assets/app-icons/chat.svg') as string;
// const contactIcon = require('../../../client/assets/app-icons/contact.svg') as string;

const notificationsInitialState: NotificationPanel = {
  items: [
    {
      id: 1,
      message: 'Ipsum delorem new as lorem ipsum, we go to hell',
      created: new Date(),
      icon: 'chatIcon',
      appName: 'Chat',
    },
    {
      id: 2,
      message: 'Delorem new as lorem ipsum, we go to hell',
      created: new Date(),
      icon: 'contactIcon',
      appName: 'Chat',
    },
  ],
};

const clientInitialState: Client = {
  activeDapp: {
    appName: null,
  },
  isHome: true,
  notification: notificationsInitialState,
  loader: { isOpen: false },
  statusBar: statusBarInitialState,
  search: searchInitialState,
  window: { width: 0, height: 0 },
  permissions: undefined,
  isOpen: {
    notification: false,
    loader: false,
    statusBar: false,
    statusBarPeers: false,
    search: false,
  },
};

export const initialState: IState = {
  channel: {},
  client: clientInitialState,
  feed: {},
  permissionManager: { isOpen: true, permissions: {}, grantedApps: [] },
  tray: { items: [] },
};

declare global {
  namespace NodeJS {
    interface Global {
      getReduxState: () => string;
      state: IState;
    }
  }
}

interface UuidChannelMap {
  uuid: string;
  channel: string;
}
let UuidChannelMapList: UuidChannelMap[];

const epicMiddleware = createEpicMiddleware();

const validateAction = (action: Action) => {
  return isFSA(action);
};

const targetWebContents = (targetId: number) => {
  const allWebContents = webContents.getAllWebContents();
  // console.log('webContents chrome proc Id\'s: ', allWebContents.map((contents) => contents.getProcessId()) );
  const targetContents = allWebContents.find(contents => contents.getProcessId() === targetId);
  return targetContents;
};

const forwardToRendererWrapper = (globalId: RendererConf[]) => {
  return () => (next: Dispatch<Action>) => <A extends Action>(action: A) => {
    if (!validateAction(action)) return next(action);
    if (action.meta && action.meta.scope === 'local') return next(action);

    // change scope to avoid endless-loop
    const rendererAction = Object.assign({}, action, {
      meta: {
        ...action.meta,
        scope: 'local',
      },
    });

    if (action.type === 'INTENT_OPEN_CHANNELS') {

      UuidChannelMapList = [
        {
          uuid: action.payload.uuidSend,
          channel: 'testChannel1',
        },
        {
          uuid: action.payload.uuidRec,
          channel: 'testChannel2',
        },
      ];

      globalId.forEach(function (renObj, i, arr) {
        if (renObj.id === action.payload.uuidSend) {
          arr[i].intent = action.payload.uuidRec;
        }
        if (renObj.id === action.payload.uuidRec) {
          arr[i].intent = action.payload.uuidSend;
        }
      });
    }

    if (action.type === 'OPEN_CHANNEL') {
      const uuidObj = globalId.find(renObj => renObj.id === action.payload.uuid);
      const intentObj = globalId.find(renObj => renObj.id === uuidObj.intent);
      const channelSender = UuidChannelMapList.find(UuidChannelMap => UuidChannelMap.uuid === uuidObj.id).channel;
      const channelReceiver = UuidChannelMapList.find(UuidChannelMap => UuidChannelMap.uuid === uuidObj.intent).channel;
      bindChannel(intentObj.winId, channelReceiver, channelSender);
    }

    const targetUUID = action.payload && action.payload.uuid || action.meta && action.meta.targetUUID;

    if (targetUUID) {
      // loop through all action uuid's passed in payload {
      const uuidObj = globalId.find(renObj => renObj.id === targetUUID);
      if (uuidObj) {
        const resolver = targetWebContents(uuidObj.winId);
        // console.log(resolver);
        if (resolver) {
          const copyAction = Object.assign({}, rendererAction);

          if (copyAction.meta) {
            delete copyAction.meta.sourceUUID;
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
};

const bindChannel = (webId: number, channelReceiver: string, channelSender: string) => {
  ipcMain.on(channelSender, (event: Electron.Event, payload: string) => {
    const bindResolver = targetWebContents(webId);
    if (bindResolver) {
      bindResolver.send(channelReceiver, payload);
    } else {
      console.log('resolver error: ', 'message lost');
    }

  });
};

const replyActionMain = (store: Store<{}>, globalId: RendererConf[]) => {
  global.getReduxState = () => JSON.stringify(store.getState());

  ipcMain.on('redux-action', (event: Electron.Event, uuid: string, action: any) => {
    const uuidObj = globalId.find(renObj => renObj.id === uuid);

    if (uuidObj) {
      const statusObj = { status: uuidObj.status };
      const metadata = { sourceUUID: uuid, name: uuidObj.name };
      action.payload = (action.payload) ? Object.assign(action.payload, statusObj) : statusObj;
      action.meta = action.meta ? Object.assign(action.meta, metadata) : metadata;
      // uuid resolver

      const uuidTargetObj = globalId.find(renObj => renObj.name === action.payload.targetDapp && renObj.status === 'dapp');

      if (uuidTargetObj) {
        const payloadUuidObj = {
          uuidRec: uuidTargetObj.id,
          uuidSend: uuid,
        };

        action.payload = Object.assign(action.payload, payloadUuidObj);

      }
      store.dispatch(action);
    } else {
      console.log('Spoofing detected');
    }
  });
};

export const configureStore = (state: IState = initialState, globalId?: RendererConf[]) => {
  const middleware: Middleware[] = [];
  middleware.push(thunk, validatePermissionAction(globalId), epicMiddleware, forwardToRendererWrapper(globalId));
  const enhanced = [applyMiddleware(...middleware)];
  const enhancer: any = compose(...enhanced);

  const storeEngine = SQLiteStorage();

  const persistConfig = {
    key: 'root',
    storage: storeEngine, // storage,
    debug: true,
  };
  const pReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(pReducer, <any> state, enhancer);
  const persistor = persistStore(store);

  epicMiddleware.run(rootEpic);
  replyActionMain(store, globalId);
  return <Store<IState>> store;
};
