
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

/*****/
// var redux = electron.remote.require('redux'); //equire('redux');
// var createStore = redux.createStore;

// var reducer = function(state, action) {
//   if (!state) state = 0;
//   if (action.type === 'INC') return state + 1;
//   return state;
// }
// var store = createStore(reducer);

// const unsubscribe = store.subscribe(() =>
//   console.log('CONSOLE>LOG', store.getState())
// );


// store.dispatch({type: 'INC'});
/****/

// const getInitialStateRenderer = electron.remote.require('/home/pidgin/job/boilerplate/electron-redux/packages/electron-redux').getInitialStateRenderer;
// const configureStore = electron.remote.require('./store/configureStore'); //
 
// !rewrite electron redux without Object.defineProperty. https://github.com/electron/electron/issues/7351#issuecomment-251331639

// TODO put it into function - init on window [ready => return store => dispatch] 

//

// const rootReducer = electron.remote.require('../reducers');


const redux = electron.remote.require('redux');
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const compose = redux.compose;
// { combineReducers, createStore, applyMiddleware, compose } 
const thunk = electron.remote.require('redux-thunk').default;
// const { hashHistory } = electron.remote.require('react-router');
// const { routerMiddleware } = electron.remote.require('react-router-redux');
const { isFSA } = electron.remote.require('flux-standard-action');


// require = null; 
const flatten = (obj) => Object.keys(obj)
  .reduce((acc, key) => {
    const val = obj[key];
    return acc.concat(typeof val === 'object' ? flatten(val) : val);
  }, []);

class SafeIpcRenderer {
  constructor(events) {
    const validEvents = flatten(events);
    const protect = (fn) => {
      return (channel, ...args) => {
        if (!validEvents.includes(channel)) {
          throw new Error(`Blocked access to unknown channel ${channel} from the renderer. 
                          Add channel to whitelist in preload.js in case it is legitimate.`);
        }
        return fn.apply(ipcRenderer, [channel].concat(args));
      };
    };

    const validateAction = (action) => {
      if (!isFSA(action)) {
        // log('WARNING! Action not FSA-compliant', action);
    
        return false;
      }
    
      return true;
    }


    const forwardToMain = store => next => (action) => { // eslint-disable-line no-unused-vars
      if (!validateAction(action)) return next(action);
    
      if (
        action.type.substr(0, 2) !== '@@'
        && action.type.substr(0, 10) !== 'redux-form'
        && (
          !action.meta
          || !action.meta.scope
          || action.meta.scope !== 'local'
        )
      ) {
        ipcRenderer.send('redux-action', action);
    
        // stop action in-flight
        // eslint-disable-next-line consistent-return
        return;
      }
    
      // eslint-disable-next-line consistent-return
      return next(action);
    };

    const counter = (state = 0, action) => {
      switch (action.type) {
        case 'INCREMENT_COUNTER':
          return state + 1;
        case 'DECREMENT_COUNTER':
          return state - 1;
        default:
          return state;
      }
    }

    const rootReducer = combineReducers({
      counter
      // routing
    });

    const replayActionRenderer = (store) => {
      ipcRenderer.on('redux-action', (event, payload) => {
        store.dispatch(payload);
      });
    }

    const configureStore = (initialState) => {

      const middleware = [thunk, forwardToMain];
      const enhanced = [
        applyMiddleware(...middleware),
      ];
      const enhancer = compose(...enhanced);
      
      console.log(redux.createStore);
      console.log(typeof rootReducer, initialState, typeof enhancer);
      const store = createStore(rootReducer, initialState, enhancer);  // ?
       
      replayActionRenderer(store);
    
      return store;
    };

    const enableStore = () => {
      const states = electron.remote.getGlobal('getReduxState');
      const initialState = JSON.parse(states());//getInitialStateRenderer(); // ???
       
      const store = configureStore(initialState);
      return store;
    } // change to browserify

    this.on = protect(ipcRenderer.on);
    this.once = protect(ipcRenderer.once);
    this.removeListener = protect(ipcRenderer.removeListener);
    this.removeAllListeners = protect(ipcRenderer.removeAllListeners);
    this.send = protect(ipcRenderer.send);
    this.sendSync = protect(ipcRenderer.sendSync);
    this.sendToHost = protect(ipcRenderer.sendToHost);
    this.remoteStore = enableStore; // electron.remote.getGlobal('getReduxState');
  }
}

window.ipc = new SafeIpcRenderer([
  "rpc-communicate"
]);

// window.storeState = store; //.getState();