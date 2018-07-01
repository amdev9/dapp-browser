
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

 
window.onload = () => {
  ipcRenderer.send('answer', process.argv);
};


class ElectronManager {
  constructor() {
    
    //todo add restriction for unknown channels, granted channels parse from process argv
    
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

window.ipc = new ElectronManager();
