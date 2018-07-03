
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

 
window.onload = () => {
  ipcRenderer.send('answer', process.argv);
};


class ElectronManager {
  constructor() {
    
    //todo add restriction for unknown channels 
    // https://github.com/kewde/electron-sandbox-boilerplate/blob/master/sandbox-preload-extended/electron/renderer/preload-extended.js, 
    // granted channels parse from process argv

    const uuidRendererParam = process.argv.filter( (param) => {
      return param.indexOf('--uuid-renderer') >= 0;
    });  
    const uuidRenderer = uuidRendererParam[0].split('=')[1];
    console.log(uuidRenderer);

    console.log(electron.remote.getGlobal('getReduxState')());

    const replayActionRenderer = (store) => { 
      ipcRenderer.on('redux-action', (event, payload) => {
        store.dispatch(payload);
      });
    }

    const getGlobalState = () => {
      const globalState = electron.remote.getGlobal('getReduxState'); 
      return globalState;
    }

    const sendActionMain = (action) => {
      console.log(uuidRenderer);
      ipcRenderer.send('redux-action', uuidRenderer, action);
    }

    const sendDataChannel = (channelName, data) => {
      // switch by channelName, find channelId passed to preload script
      ipcRenderer.send(channelId, uuidRenderer, data);
    }
    
    const receiveDataChannel = (channelName, callbackData) => {
      // switch by channelName, find channelId passed to preload script
      ipcRenderer.on(channelId, (event, payload) => {
        callbackData(payload);
      });
    }

    this.replayActionRenderer = replayActionRenderer;
    this.getGlobalState = getGlobalState;
    this.sendActionMain = sendActionMain;

    this.sendDataChannel = sendDataChannel;
    this.receiveDataChannel = receiveDataChannel;
    // this.send = ipcRenderer.send; // for switch
  }
}

//**************** safe ipc class declaration ***************//

const flatten = (obj) => Object.keys(obj)
  .reduce((acc, key) => {
    const val = obj[key];
    return acc.concat(typeof val === 'object' ? flatten(val) : val);
  }, []);



/**
 * SafeIpcRenderer //todo integrate with ElectronManager
 *
 * This class wraps electron's ipcRenderer an prevents
 * invocations to channels passed to the constructor. The instance methods
 * are all created in the constructor to ensure that the protect method
 * and validEvents array cannot be overridden.
 *
 */
class SafeIpcRenderer {
  constructor (events) {
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
    this.on = protect(ipcRenderer.on);
    this.once = protect(ipcRenderer.once);
    this.removeListener = protect(ipcRenderer.removeListener);
    this.removeAllListeners = protect(ipcRenderer.removeAllListeners);
    this.send = protect(ipcRenderer.send);
    this.sendSync = protect(ipcRenderer.sendSync);
    this.sendToHost = protect(ipcRenderer.sendToHost);
  }
}

/*
   Modify the whitefilter here.
*/
window.ipcSafe = new SafeIpcRenderer([
  "rpc-start",
  "rpc-request" //todo list from process argv
]);

window.ipc = new ElectronManager();
