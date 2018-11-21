import { BrowserView, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as uuidv4 from 'uuid/v4';
import { AppItem } from './helpers/AppsManager';
import { DAPPS_PATH } from './helpers/constants/appPaths';
import { RendererConf } from './helpers/constants/globalVariables';

let dappView: Electron.BrowserView = null;

// const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'dapps', 'download');

export function createDappView(globalUUIDList: RendererConf[], dapp: AppItem) { // entryPath: string, appName: string
  const createdDapp = dapp && globalUUIDList.find(item => item.name === dapp.appName && item.status === 'dapp');

  if (createdDapp) { // Skip creating a new BrowserView for the same dapp
    return createdDapp;
  }
  const uuidDapp = uuidv4();
  const authorizedChannelsList = ['channelId1', 'channelId2']; // next todo get channels list from dapp manifest

  let webPrefObj = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', 'preload.js'),
    additionalArguments: [
      '--uuid-renderer='.concat(uuidDapp),
      '--channels='.concat(authorizedChannelsList.join(';')),
    ],
  };

  if (process.env.ELECTRON_ENV !== 'development') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true });
  }

  // dappView = new BrowserView({
  dappView = new BrowserWindow({
    webPreferences: webPrefObj,
    show: true,
    title: 'asdf',
    x: 0,
    y: 0,
    width:1800,
    height: 800,
  });

  // console.log('entry: ', path.join(DAPPS_PATH, dapp.appName, dapp.main));
  const dappPath = path.join(DAPPS_PATH, dapp.appName, dapp.main);
  const dappPathUrl = url.format({
    protocol: 'file',
    hostname: dappPath,
  });
  dappView.webContents.loadURL(dappPathUrl); // todo pass @param path to index.html

  if (process.env.ELECTRON_ENV === 'development') {
    const devtools = new BrowserWindow();
    // dappView.webContents.setDevToolsWebContents();
    dappView.webContents.openDevTools();
  }

  const renderIdDapp = dappView.webContents.getProcessId();

  const rendererObj: RendererConf = {
    id: uuidDapp,
    status: 'dapp',
    winId: renderIdDapp,
    // dappView,
    name: dapp.appName,
  };
  globalUUIDList.push(rendererObj);

  return rendererObj;
}
