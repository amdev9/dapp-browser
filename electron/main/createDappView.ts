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

  let webPrefObj = {
    nodeIntegration: false,
    preload: path.join(__dirname, '..', 'preload.js'),
    additionalArguments: [ 
      '--uuid-renderer='.concat(uuidDapp),
      '--channels='.concat(authorizedChannelsList.join(";"))
    ]
  };

  if (process.env.NODE_ENV == 'production') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true })
  }

  dappView = new BrowserWindow({ // BrowserView
    webPreferences: webPrefObj
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
 
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  dappView.webContents.on('did-finish-load', () => {
    if (!dappView) {
      throw new Error('"clientWindow" is not defined');
    }
    dappView.show();
    dappView.focus();

    
  });

  dappView.on('closed', () => {
    dappView = null;
    // remove from global
  });

  if (process.env.NODE_ENV === 'development') {
    openDevTool(dappView, true);
  }  


  const renderIdDapp = dappView.webContents.getProcessId(); //.id,
    // console.log(renderIdDapp);
    

    let rendererObj: RendererConf = {
      id: uuidDapp,
      status: 'dapp',
      winId: renderIdDapp,
      name: 'dappname128729'.concat(entryPath.split('.')[0]) // load from dapp
    }
    globalUUIDList.push(rendererObj);

}
