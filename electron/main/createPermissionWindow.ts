import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools';
import { RendererConf } from './helpers/constants/globalVariables';
import { PERMISSION_PATH } from './helpers/constants/appPaths';

let permissionWindow: Electron.BrowserWindow = null;
// const PATH: string = path.join(__dirname, 'permissionManager');

export function createPermissionWindow(globalUUIDList: RendererConf[], mainWindow: Electron.BrowserWindow, appName: string, permissions: string[]) {
  const uuid = uuidv4();

  let webPreferences = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', 'preload-pm.js'),
    additionalArguments: [
      '--uuid-renderer='.concat(uuid),
      '--app-name='.concat(appName),
      '--permissions='.concat(JSON.stringify(permissions)),
    ],
  };

  if (process.env.ELECTRON_ENV !== 'development') {
    webPreferences = Object.assign(webPreferences, { sandbox: true });
  }

  permissionWindow = new BrowserWindow({
    parent: mainWindow,
    title: appName + ' | Permissions',
    alwaysOnTop: true,
    // center: true,
    show: true,
    x: 0,
    y: 0,
    width: 600,
    height: 600,
    // resizable: false,
    webPreferences,
    modal: true,
  });
  permissionWindow.setMenu(null);

  const permissionWPath = path.join(PERMISSION_PATH, 'index.html');
  const permissionWPathUrl = url.format({
    protocol: 'file',
    hostname: permissionWPath,
  });
  permissionWindow.loadURL(permissionWPathUrl);

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
