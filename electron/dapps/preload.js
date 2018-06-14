
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

 
class ElectronManager {
  constructor() {

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
      ipcRenderer.send('redux-action', action);
    } 
  
    this.replayActionRenderer = replayActionRenderer;
    this.getGlobalState = getGlobalState;
    this.sendActionMain = sendActionMain;

    this.send = ipcRenderer.send; // for switch
  }
}

window.ipc = new ElectronManager();
