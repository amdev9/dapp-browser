import { BrowserWindow, BrowserView } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools';

let dappView: Electron.BrowserWindow = null;
 
const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'dapps');

export type ChannelsConf = Array<string>;
export type BindedConf = Map<string, ChannelsConf>;
export type BindedListConf = Array<BindedConf>;
export interface RendererConf {
  id: string;
  name: string;
  status: string;
  winId: number;
  intent?: string;
  binded?: BindedListConf
}

export function createDappView(globalUUIDList: RendererConf[], entryPath: string) {

  const uuidDapp = uuidv4();
  const authorizedChannelsList = ['channelId1', 'channelId2']; //next todo get channels list from dapp manifest
  dappView = new BrowserWindow({ // BrowserView
    webPreferences: {
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, '..', 'preload.js'),
      additionalArguments: [ 
        '--uuid-renderer='.concat(uuidDapp),
        '--channels='.concat(authorizedChannelsList.join(";"))
      ]
    }
  });
  
  const bounds = {
    x: 300,
    y: 0,
    width: 300,
    height: 300
  };
 
  /* BrowserView
      dappView.setBounds(bounds); 
  */
  dappView.webContents.loadURL('file://' + path.join(DAPPS_PATH, entryPath));
  openDevTool(dappView, true);
  let rendererObj: RendererConf = {
    id: uuidDapp,
    status: 'dapp',
    winId: dappView.id,
    name: 'dappname128729'.concat(entryPath.split('.')[0]) // load from dapp
  }
  globalUUIDList.push(rendererObj);
}
