
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

 

// const getInitialStateRenderer = electron.remote.require('/home/pidgin/job/boilerplate/electron-redux/packages/electron-redux').getInitialStateRenderer;
// const configureStore = electron.remote.require('./store/configureStore'); //
 
// !rewrite electron redux without Object.defineProperty. https://github.com/electron/electron/issues/7351#issuecomment-251331639

// TODO put it into function - init on window [ready => return store => dispatch] 

//

// const rootReducer = electron.remote.require('../reducers');

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

    
    const replayActionRenderer = (store) => { //*** define in preload script */
      ipcRenderer.on('redux-action', (event, payload) => {
        store.dispatch(payload);
      });
    }

   
    const getGlobalState = () => {
      const globalState = electron.remote.getGlobal('getReduxState'); 
      return globalState;
    }

    const sendToMainAction = (action) => {
      ipcRenderer.send('redux-action', action);
    } 
  

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