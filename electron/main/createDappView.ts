import { BrowserView, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as uuidv4 from 'uuid/v4';
import { AppItem } from './helpers/AppsManager';
import { DAPPS_PATH } from './helpers/constants/appPaths';

let dappView: Electron.BrowserView = null;

// const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'dapps', 'download');

export type ChannelsConf = string[];
export type BindedConf = Map<string, ChannelsConf>;
export type BindedListConf = BindedConf[];
export interface RendererConf {
  id: string;
  name?: string;
  status: string;
  winId: number;
  dappView?: BrowserView;
  intent?: string;
  binded?: BindedListConf;
}

export function createDappView(globalUUIDList: RendererConf[], dapp: AppItem) { // entryPath: string, appName: string
  if (globalUUIDList.findIndex(item => item.name === dapp.appName && item.status === 'dapp') !== -1) { // Skip creating a new BrowserView for the same dapp
    return;
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

 
  // let devtools = new BrowserWindow()

  // dappView.webContents.setDevToolsWebContents(devtools.webContents);
  // dappView.webContents.openDevTools({ mode: 'detach' });
 

  const renderIdDapp = dappView.webContents.getProcessId();

  const rendererObj: RendererConf = {
    id: uuidDapp,
    status: 'dapp',
    winId: renderIdDapp,
    dappView,
    name: dapp.appName,
  };
  globalUUIDList.push(rendererObj);

}
