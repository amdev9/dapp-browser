const { BrowserWindow } = require('electron');
const path = require('path');
 

let clientWindow = null;
const RENDERER_PATH = path.join(__dirname, 'client');
const VIEW_PATH = path.join(__dirname, 'dapps');

function createClientWindow(uuid) {  
  clientWindow = new BrowserWindow({
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: false,
      sandbox: true,
      // contextIsolation: true,
      preload: path.join(VIEW_PATH, 'preload.js'), //path.join(RENDERER_PATH, 'preload-extended.js')
      additionalArguments: [ '--uuid-renderer='.concat(uuid) ]
    }
  })
  clientWindow.loadURL('file://' + path.join(RENDERER_PATH, 'index.html'));

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  // clientWindow.webContents.on('did-finish-load', () => {
  //   if (!clientWindow) {
  //     throw new Error('"clientWindow" is not defined');
  //   }
  //   clientWindow.show();
  //   clientWindow.focus();
  // });

  // clientWindow.on('closed', () => {
  //   clientWindow = null;
  // });

  return clientWindow;
}

module.exports = createClientWindow;