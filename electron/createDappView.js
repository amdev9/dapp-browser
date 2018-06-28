const { BrowserWindow, BrowserView } = require('electron');
const path = require('path');
const uuidv4 = require('uuid/v4');
const openDevTool = require('./helpers/devtools');

let dappView = null;
 
const DAPPS_PATH = path.join(__dirname, 'dapps');

function createDappView(globalUUIDList, entryPath) {

    const uuidDapp = uuidv4();
    dappView = new BrowserWindow({ // BrowserView
        webPreferences: {
            nodeIntegration: false,
            sandbox: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            additionalArguments: [ '--uuid-renderer='.concat(uuidDapp) ]
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

    rendererObj = {
        id: uuidDapp,
        status: 'dapp',
        viewId: dappView.id,
        name: 'dappname128729'.concat(entryPath.split('.')[0]) // load from dapp
    }
    globalUUIDList.push(rendererObj);

    console.log('length', BrowserView.getAllViews().length);
    // return dappView;
}

module.exports = createDappView;
