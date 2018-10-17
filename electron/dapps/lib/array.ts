import { combineReducers, createStore, applyMiddleware, compose, GenericStoreEnhancer, Store, Dispatch } from 'redux';
 
 
import { isFSA } from 'flux-standard-action';
import { createEpicMiddleware } from 'redux-observable';
import { logger } from 'redux-logger';
import { rootEpic } from './redux/epics';
import { rootReducer } from './redux/reducers'; 

interface ElectronManager {
  sendActionMain(action: any): void;
  replyActionRenderer(store: any): void;
  getGlobalState(): () => string;
  sendDataChannel(channelId: string, data: string): () => any,
  receiveDataChannel(channelId: string, callback: () => any): () => any
}

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
  ipc: ElectronManager;
};


interface Action {
  type: string;
  payload?: {
    uuid?: string;
    uuidSend?: string;
    uuidRec?: string;
  };
  meta?: {
    scope?: string
  };
}


const epicMiddleware = createEpicMiddleware();

const electronManager = window.ipc;

const validateAction = (action: Action) => {
  return isFSA(action);
}

// const forwardToMain = (store: Store<any>) => (next: Dispatch<any>) => <A extends Action>(action: A) => {
const forwardToMain = (store: Store<any>) => (next: Dispatch<void>) => <A extends Action>(action: A) => {
  if (!validateAction(action)) return next(action);

  if (
    action.type.substr(0, 2) !== '@@' &&
    action.type.substr(0, 10) !== 'redux-form' &&
    (!action.meta ||
      !action.meta.scope ||
      action.meta.scope !== 'local'
    )
  ) {
    electronManager.sendActionMain(action);  

    // stop action in-flight
    // eslint-disable-next-line consistent-return
    return;
  }

  // eslint-disable-next-line consistent-return
  return next(action);
};

const configureStore = (initialState?: any) => {
  const middleware = [forwardToMain, epicMiddleware, logger];
  const enhanced = [
    applyMiddleware(...middleware),
  ];
  const enhancer: GenericStoreEnhancer = compose(...enhanced); 
  const store = createStore(rootReducer, initialState, enhancer);
  epicMiddleware.run(rootEpic);
  electronManager.replyActionRenderer(store);  
  return store;
};

const initStore = () => {
  const states = electronManager.getGlobalState();  
  const initialState = JSON.parse(states()); // getInitialStateRenderer();  

  const store = configureStore(initialState);
  return store;
}
 
const sendDataChannel1 = (data: any) => {
  electronManager.sendDataChannel('testChannel1', data);
}

const sendDataChannel2 = (data: any) => {
  electronManager.sendDataChannel('testChannel2', data);
}

const receiveDataChannel = (channelId: string, callback: any) => {
  electronManager.receiveDataChannel(channelId, callback);
}

const store = initStore();

export { 
  store, 
  sendDataChannel1,
  sendDataChannel2,
  receiveDataChannel
};