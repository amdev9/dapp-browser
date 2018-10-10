import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools';
import {RendererConf} from "./createDappView";

let permissionWindow: Electron.BrowserWindow = null;
const PATH: string = path.join(__dirname, '..', '..', 'permissionManager');

export function createPermissionWindow(globalUUIDList: RendererConf[], mainWindow: Electron.BrowserWindow, appName: string, permissions: string[]) {
  const uuid = uuidv4();

  let webPrefObj = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', '..', 'permissionManager', 'preload.js'),
    additionalArguments: [
      '--uuid-renderer='.concat(uuid),
      '--permissions='.concat(JSON.stringify(permissions)),
    ],
  };

  if (process.env.ELECTRON_ENV !== 'development') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true });
  }

  permissionWindow = new BrowserWindow({
    parent: mainWindow,
    title: appName + " | Permissions",
    alwaysOnTop: true,
    // center: true,
    show: true,
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    // resizable: false,
    webPreferences: webPrefObj,
    modal: true,
  });
  permissionWindow.setMenu(null);
  permissionWindow.loadURL('file://' + path.join(PATH, 'index.html'));

  if (process.env.ELECTRON_ENV === 'development') {
    openDevTool(permissionWindow, true);
  }


  const renderIdDapp = permissionWindow.webContents.getProcessId();

  const rendererObj: RendererConf = {
    id: uuid,
    status: 'permission_manager',
    winId: renderIdDapp,
    name: appName,
  };
  globalUUIDList.push(rendererObj);
  return permissionWindow;
}
