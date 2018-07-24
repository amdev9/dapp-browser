import { BrowserWindow, BrowserView } from 'electron';
import * as path from 'path';
import * as uuidv4 from 'uuid/v4';
import { openDevTool } from './helpers/devtools';

let dappView: Electron.BrowserWindow = null;
 
const DAPPS_PATH: string = path.join(__dirname, 'dapps');

export function createDappView(globalUUIDList: object[], entryPath: string) {

    const uuidDapp = uuidv4();
    const authorizedChannelsList = ['channelId1', 'channelId2']; //next todo get channels list from dapp manifest
    dappView = new BrowserWindow({ // BrowserView
        webPreferences: {
            nodeIntegration: false,
            sandbox: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            additionArguments: [ 
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
 
    /* * BrowserView
     * dappView.setBounds(bounds); 
     * */
    dappView.webContents.loadURL('file://' + path.join(DAPPS_PATH, entryPath));

    openDevTool(dappView, true);

    let rendererObj: object = {
        id: uuidDapp,
        status: 'dapp',
        winId: dappView.id,
        name: 'dappname128729'.concat(entryPath.split('.')[0]) // load from dapp
    }
    globalUUIDList.push(rendererObj);

    console.log('length', BrowserView.getAllViews().length);
    // return dappView;
}
