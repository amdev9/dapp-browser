import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools'; 

let permissionWindow: Electron.BrowserWindow = null;
const PATH: string = path.join(__dirname, '..');

export function createPermissionWindow() {
  const uuidClient = uuidv4();
  const authorizedChannelsList = ['channelId1', 'channelId2']; //next todo get channels list from dapp manifest

  let webPrefObj = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', 'preload.js'),
    additionalArguments: [
      '--uuid-renderer='.concat(uuidClient),
      '--channels='.concat(authorizedChannelsList.join(";"))
    ]
  };

  if (process.env.ELECTRON_ENV == 'production') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true })
  }

  permissionWindow = new BrowserWindow({
    title: "ARRAY | Permissions",
    show: false,
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    webPreferences: webPrefObj
  })
  permissionWindow.loadURL('file://' + path.join(PATH, 'permission.html'));

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  permissionWindow.webContents.on('did-finish-load', () => {
    if (!permissionWindow) {
      throw new Error('"permissionWindow" is not defined');
    }
    permissionWindow.show();
    permissionWindow.focus();
  });

  permissionWindow.on('closed', () => {
    permissionWindow = null;
    // remove from global
  });

  // console.log(process.env);
  if (process.env.ELECTRON_ENV === 'development') {
    openDevTool(permissionWindow, true);
  }  
  
  
  return permissionWindow;
}
