import "babel-polyfill";
 
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { logger } from '../../../../Library/Caches/typescript/2.9/node_modules/@types/redux-logger';
import { isFSA } from 'flux-standard-action';

import { rootEpic } from './redux/epics';
import rootReducer from './redux/reducers';

import * as counterActions from './redux/actions/counter';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
  ipc: Object; // fix
};
  
declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};
  
const actionCreators = Object.assign({}, 
    counterActions,
    {}
);

const epicMiddleware = createEpicMiddleware(); 

const electronManager = window.ipc;

const validateAction = (action) => {
  return isFSA(action);
}

const forwardToMain = store => next => (action) => {
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



const configureStore = (initialState) => {
    const middleware = [forwardToMain, epicMiddleware, logger]; 
    const enhanced = [
        applyMiddleware(...middleware),
    ];
    
    const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators
    }) as any :
    compose;
    
    const enhancer = composeEnhancers(...enhanced); // compose
    console.log(typeof rootReducer, initialState, typeof enhancer);
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
    console.log('initStore');
    const states = electronManager.getGlobalState(); // window.ipc 
    console.log(states);
    const initialState = JSON.parse(states()); // getInitialStateRenderer();  
    const store = configureStore(initialState);
    return store;
}


// // electron-redux store
const store = initStore();

export default store;