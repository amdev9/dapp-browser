import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools';
import { AppItem } from './helpers/AppsManager';

let permissionWindow: Electron.BrowserWindow = null;
const PATH: string = path.join(__dirname, '..', '..', 'permissionManager');

export function createPermissionWindow(mainWindow: Electron.BrowserWindow, appName: string, permissions: string[]) {
  const uuidClient = uuidv4();

  let preloadPath = path.join(__dirname, '..', '..', 'permissionManager', 'preload.js');
  let webPrefObj = {
    nodeIntegration: false,
    preload: preloadPath,
    additionalArguments: [
      '--uuid-renderer='.concat(uuidClient),
      // '--permissions='.concat(JSON.stringify(permissions)),
    ] 
  };

  if (process.env.ELECTRON_ENV !== 'development') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true })
  }

  permissionWindow = new BrowserWindow({
    parent: mainWindow,
    title: appName + " | Permissions",
    alwaysOnTop: true,
    // center: true,
    show: false,
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    // resizable: false,
    webPreferences: webPrefObj
  })
  permissionWindow.loadURL('file://' + path.join(PATH, 'index.html'));

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
