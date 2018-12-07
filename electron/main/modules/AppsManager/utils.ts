import * as fs from 'fs';
import { BrowserView, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as uuidv4 from 'uuid/v4';

import * as AppsManagerModels from './models';
import { DAPPS_PATH } from './constants';
import { RendererConf } from '../../helpers/constants/globalVariables';

export async function readDir(path: string): Promise<any> {
  return new Promise((res: any, rej: any) => {
    fs.readdir(path, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

export async function readFile(path: string, opts = 'utf8'): Promise<any> {
  return new Promise((res: any, rej: any) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

let dappView: Electron.BrowserView = null;
export function createDappView(globalUUIDList: RendererConf[], dapp: AppsManagerModels.AppItem) { // entryPath: string, appName: string
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

  dappView = new BrowserView({
    webPreferences: webPrefObj,
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
    dappView.webContents.setDevToolsWebContents(devtools.webContents);
    dappView.webContents.openDevTools({ mode: 'detach' });
  }

  const renderIdDapp = dappView.webContents.getProcessId();

  const rendererObj: RendererConf = {
    dappView,
    id: uuidDapp,
    status: 'dapp',
    winId: renderIdDapp,
    name: dapp.appName,
  };
  globalUUIDList.push(rendererObj);

  return rendererObj;
}
