const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
 
 
class ElectronManager {
  constructor() {
    

    const uuidRendererParam = process.argv.filter( (param) => {
      return param.indexOf('--uuid-renderer') >= 0;
    });  
    const uuidRenderer = uuidRendererParam[0].split("=")[1];
    //
    const permissionsParam = process.argv.filter( (param) => {
      return param.indexOf('--permissions') >= 0;
    });  
    let permissionsParamJson = permissionsParam[0].split("=")[1];
    console.log(permissionsParamJson);
    const permissions = JSON.parse(permissionsParamJson);
    // console.log(uuidRenderer);

    // const authChannels = channelsParam[0].split("=").split(";");
    // console.log(authChannels);

    // console.log(electron.remote.getGlobal('getReduxState')());

    const replyActionRenderer = (store) => { 
      ipcRenderer.on('redux-action', (event, payload) => { 
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

    const sendActionMain = (action) => {
      // console.log(uuidRenderer);
      ipcRenderer.send('redux-action', uuidRenderer, action);
    }

    const sendDataChannel = (channelId, data) => { 
      ipcRenderer.send(channelId, data);
    }
    
    const receiveDataChannel = (channelId, callbackData) => {
      ipcRenderer.on(channelId, (event, payload) => {
        callbackData(payload);
      });
    }


    this.replyActionRenderer = replyActionRenderer;
    this.getGlobalState = getGlobalState;
    this.sendActionMain = sendActionMain;
    this.sendDataChannel = sendDataChannel;
    this.receiveDataChannel = receiveDataChannel;

    this.permissions = permissions;
  }
}
 
window.ipc = new ElectronManager();
