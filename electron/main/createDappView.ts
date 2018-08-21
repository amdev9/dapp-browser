import { BrowserView } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
 
let dappView: Electron.BrowserView = null;
 
const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'dapps');

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

  if (process.env.ELECTRON_ENV == 'production') {
    webPrefObj = Object.assign(webPrefObj, { sandbox: true })
  }

  dappView = new BrowserView({
    webPreferences: webPrefObj
  });
  
  const bounds = {
    x: 70,
    y: 60,
    width: 300,
    height: 300
  };

  dappView.webContents.loadURL('file://' + path.join(DAPPS_PATH, entryPath));

  const renderIdDapp = dappView.webContents.getProcessId(); 

  let rendererObj: RendererConf = {
    id: uuidDapp,
    status: 'dapp',
    winId: renderIdDapp,
    dappView,
    name: entryPath.split('.')[0] // load from dapp
  }
  globalUUIDList.push(rendererObj);

}
