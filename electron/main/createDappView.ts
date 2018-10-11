import { BrowserView, BrowserWindow } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { AppItem } from './helpers/AppsManager';

let dappView: Electron.BrowserView = null;
let devToolView = null;

const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'dapps', 'download');

export type ChannelsConf = Array<string>;
export type BindedConf = Map<string, ChannelsConf>;
export type BindedListConf = Array<BindedConf>;
export interface RendererConf {
  id: string;
  name: string;
  status: string;
  winId: number;
  dappView?: BrowserView,
  intent?: string;
  binded?: BindedListConf
}

export function createDappView(globalUUIDList: RendererConf[], dapp: AppItem) { //entryPath: string, appName: string
  const uuidDapp = uuidv4();
  const authorizedChannelsList = ['channelId1', 'channelId2']; //next todo get channels list from dapp manifest

  let webPrefObj = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', 'preload.js'),
    additionalArguments: [
      '--uuid-renderer='.concat(uuidDapp),
      '--channels='.concat(authorizedChannelsList.join(";"))
    ]
  };

  if (process.env.ELECTRON_ENV !== 'development') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true })
  }

  dappView = new BrowserView({
    webPreferences: webPrefObj
  });

  // console.log('entry: ', path.join(DAPPS_PATH, dapp.appName, dapp.main));

  dappView.webContents.loadURL('file://' + path.join(DAPPS_PATH, dapp.appName, dapp.main)); //todo pass @param path to index.html

  if (!devToolView){
    devToolView = new BrowserWindow();
    dappView.webContents.setDevToolsWebContents(devToolView.webContents);
    dappView.webContents.openDevTools();
  }
  const renderIdDapp = dappView.webContents.getProcessId();

  let rendererObj: RendererConf = {
    id: uuidDapp,
    status: 'dapp',
    winId: renderIdDapp,
    dappView,
    name: dapp.appName
  };
  globalUUIDList.push(rendererObj);

}
