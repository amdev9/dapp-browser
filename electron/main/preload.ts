import * as electron from 'electron';
import { Store } from 'redux';
const ipcRenderer = electron.ipcRenderer;
 
declare global {
  interface Window { ipc: object; }
}

window.onload = () => {
  ipcRenderer.send('answer', process.argv);
};

class ElectronManager {
  replyActionRenderer: (store: any) => void;
  getGlobalState: () => any;
  sendActionMain: (action: any) => void;
  sendDataChannel: (channelId: string, data: any) => void;
  receiveDataChannel: (channelId: string, callbackData: any) => void;
  constructor() {
    
    // https://github.com/kewde/electron-sandbox-boilerplate/blob/master/sandbox-preload-extended/electron/renderer/preload-extended.js, 
    // granted channels parse from process argv


    // const channelsParam = process.argv.filter( (param) => {
    //   return param.indexOf('--channels') >= 0;
    // });

    const uuidRendererParam = process.argv.filter( (param) => {
      return param.indexOf('--uuid-renderer') >= 0;
    });  
    const uuidRenderer = uuidRendererParam[0].split("=")[1];
    console.log(uuidRenderer);

    // const authChannels = channelsParam[0].split("=").split(";");
    // console.log(authChannels);

    console.log(electron.remote.getGlobal('getReduxState')());

    const replyActionRenderer = (store: Store<{}>) => { 
      ipcRenderer.on('redux-action', (event: Electron.Event, payload: any) => { 
        // additional check for uuid received
        if( !payload.uuid || (payload.uuid && payload.uuid.includes(uuidRenderer)) ) {
          store.dispatch(payload);
        }
      });
    }

    const getGlobalState = () => {
      const globalState = electron.remote.getGlobal('getReduxState'); 
      return globalState;
    }

    const sendActionMain = (action: string) => {
      console.log(uuidRenderer);
      ipcRenderer.send('redux-action', uuidRenderer, action);
    }

    // building ipcCommunicator with sendDataChannel, receiveDataChannel & BIND_OPEN_CHANNELS_DONE action triggered
    const sendDataChannel = (channelId: string, data: any) => { 
      ipcRenderer.send(channelId, uuidRenderer, data);
    }
    
    const receiveDataChannel = (channelId: string, callbackData: any) => {
      ipcRenderer.on(channelId, (event: Electron.Event, payload: any) => {
        callbackData(payload);
      });
    }

    this.replyActionRenderer = replyActionRenderer;
    this.getGlobalState = getGlobalState;
    this.sendActionMain = sendActionMain;
    this.sendDataChannel = sendDataChannel;
    this.receiveDataChannel = receiveDataChannel;
  }
}

//**************** safe ipc class declaration ***************//

// const flatten = (obj) => Object.keys(obj)
//   .reduce((acc, key) => {
//     const val = obj[key];
//     return acc.concat(typeof val === 'object' ? flatten(val) : val);
//   }, []);



// /**
//  * SafeIpcRenderer //next todo integrate with ElectronManager
//  *
//  * This class wraps electron's ipcRenderer an prevents
//  * invocations to channels passed to the constructor. The instance methods
//  * are all created in the constructor to ensure that the protect method
//  * and validEvents array cannot be overridden.
//  *
//  */
// class SafeIpcRenderer {
//   constructor (events) {
//     const validEvents = flatten(events);
//     const protect = (fn) => {
//       return (channel, ...args) => {
//         if (!validEvents.includes(channel)) {
//           throw new Error(`Blocked access to unknown channel ${channel} from the renderer. 
//                           Add channel to whitelist in preload.js in case it is legitimate.`);
//         }
//         return fn.apply(ipcRenderer, [channel].concat(args));
//       };
//     };
//     this.on = protect(ipcRenderer.on);
//     this.once = protect(ipcRenderer.once);
//     this.removeListener = protect(ipcRenderer.removeListener);
//     this.removeAllListeners = protect(ipcRenderer.removeAllListeners);
//     this.send = protect(ipcRenderer.send);
//     this.sendSync = protect(ipcRenderer.sendSync);
//     this.sendToHost = protect(ipcRenderer.sendToHost);
//   }
// }

// /*
//    Modify the whitefilter here.
// */
// window.ipcSafe = new SafeIpcRenderer([ "redux-action"]);  // ...authChannels,

window.ipc = new ElectronManager();

