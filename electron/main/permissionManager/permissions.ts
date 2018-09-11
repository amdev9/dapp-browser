// import "babel-polyfill";
 
import { combineReducers, createStore, applyMiddleware, compose, StoreEnhancer, Store, Middleware, Dispatch } from 'redux';
 
import { isFSA } from 'flux-standard-action'; 
import { Permission } from './model';
 
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
  
interface ElectronManager {
  sendActionMain(action: any): void;
  replyActionRenderer(store: any): void;
  getGlobalState(): () => string;
  permissions: Permission[]
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
  
const actionCreators = Object.assign({}, {});
 
const electronManager = window.ipc;

const validateAction = (action: Action) => {
  return isFSA(action);
}

const forwardToMain = (store: Store<any>) => (next: Dispatch<Action>) => <A extends Action>(action: A) => {
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

const configureStore = () => {
  const middleware = [forwardToMain]; 
  const enhanced = [
      applyMiddleware(...middleware),
  ];
  
  const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionCreators
  }) as any :
  compose;
  
  const enhancer = composeEnhancers(...enhanced); // compose
  const store = createStore(enhancer);

  electronManager.replyActionRenderer(store); // window.ipc
  return store;
};

const initStore = () => {
  const store = configureStore();
  return store;
}

// // electron-redux store
const store = initStore();

export { store, electronManager };


// if( document.getElementById('permission') ) {
//   document.getElementById('permission').innerHTML = JSON.stringify(electronManager.permissions);
// }

