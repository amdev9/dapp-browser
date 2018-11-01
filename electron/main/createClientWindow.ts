import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools';
import { RendererConf } from './createDappView';
import { RENDERER_PATH } from './helpers/constants/appPaths';

let clientWindow: Electron.BrowserWindow = null;
// const RENDERER_PATH: string = path.join(__dirname, '..', '..', 'client');

export function createClientWindow(globalUUIDList: RendererConf[]) {
  const uuidClient = uuidv4();
  const authorizedChannelsList = ['channelId1', 'channelId2']; // next todo get channels list from dapp manifest

  let webPrefObj = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', 'preload.js'),
    additionalArguments: [
      '--uuid-renderer='.concat(uuidClient),
      '--channels='.concat(authorizedChannelsList.join(';')),
    ],
  };

  if (process.env.ELECTRON_ENV !== 'development') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true });
  }

  clientWindow = new BrowserWindow({
    title: 'ARRAY | Client',
    show: false,
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    webPreferences: webPrefObj,
  });
  const clientPath = path.join(RENDERER_PATH, 'index.html');
  const clientPathUrl = url.format({
    protocol: 'file',
    hostname: clientPath,
  });
  clientWindow.loadURL(clientPathUrl);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  clientWindow.webContents.on('did-finish-load', () => {
    if (!clientWindow) {
      throw new Error('"clientWindow" is not defined');
    }
    clientWindow.show();
    clientWindow.focus();
  });

  clientWindow.on('closed', () => {
    clientWindow = null;
    // remove from global
  });

  // console.log(process.env);
  if (process.env.ELECTRON_ENV === 'development') {
    openDevTool(clientWindow, true);
  }
  clientWindow.webContents.openDevTools({mode: "detach"});

  const renderIdClient = clientWindow.webContents.getProcessId(); // .webContents.getProcessId(); //.id,
  const rendererObj: RendererConf = {
    id: uuidClient,
    status: 'client',
    winId: renderIdClient,
  };
  globalUUIDList.push(rendererObj);

  return clientWindow;
}
