import 'babel-polyfill';

import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  StoreEnhancer,
  Store,
  Middleware,
  GenericStoreEnhancer,
  Dispatch,
  AnyAction,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { logger } from 'redux-logger';
import { isFSA } from 'flux-standard-action';

import { rootEpic } from './redux/epics';
import rootReducer from './redux/reducers';

import { actions as notificationActions } from './modules/Notification';
import * as trayActions from './redux/actions/tray';

import { IState as State } from './redux/reducers/state';
import { component as StoreManager } from './modules/StoreManager';

interface Action {
  type: string;
  payload?: {
    uuid?: string;
    uuidSend?: string;
    uuidRec?: string;
  };
  meta?: {
    scope?: string;
    uid?: string;
  };
}

interface ElectronManager {
  sendActionMain(action: any): void;

  replyActionRenderer(store: any): void;

  getGlobalState(): () => string;

  getElectronEnv(): string;
}

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
  ipc: ElectronManager;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};

const actionCreators = Object.assign({},
  notificationActions,
  trayActions,
  {}
);

const epicMiddleware = createEpicMiddleware();

const electronManager = window.ipc;

const validateAction = (action: Action) => {
  return isFSA(action);
};

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
    electronManager.sendActionMain(action); // window.ipc
    // stop action in-flight
    // eslint-disable-next-line consistent-return
    return;
  }
  // eslint-disable-next-line consistent-return
  return next(action);
};

const promiseHandlerMiddleware = () => {
  return (store: Store<any>) => (next: Dispatch<AnyAction>) => <A extends Action>(action: A) => {
    if (action.meta && action.meta) {
      StoreManager.emitter.emit(action.meta.uid, action);
    }
    StoreManager.observable.next(action);
    return next(action);
  };
};

const configureStore = (initialState?: State) => {
  const middleware = [forwardToMain, epicMiddleware, logger, promiseHandlerMiddleware()];
  const enhanced = [
    applyMiddleware(...middleware),
  ];

  const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators
    }) as any :
    compose;

  const enhancer: GenericStoreEnhancer = composeEnhancers(...enhanced); // compose

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./redux/reducers', () =>
      store.replaceReducer(require('./redux/reducers')) // eslint-disable-line global-require
    );
  }

  epicMiddleware.run(rootEpic);

  electronManager.replyActionRenderer(store); // window.ipc
  return store;
};

const initStore = () => {
  const states = electronManager.getGlobalState(); // window.ipc
  const initialState = JSON.parse(states()); // getInitialStateRenderer();
  const store = configureStore(initialState);
  return store;
};

export const isProduction = () => {
  return electronManager.getElectronEnv() !== 'development';
};

// // electron-redux store
const store = initStore();
StoreManager.store = store;

export default store;
