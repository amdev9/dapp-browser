const { BrowserWindow } = require('electron');
const path = require('path');
const uuidv4 = require('uuid/v4');

let dappView = null;
 
const VIEW_PATH = path.join(__dirname, 'dapps');

function createDappView(clientWindow, globalUUID) {

    const uuidDapp = uuidv4();
    // process.stdout.write(uuidDapp);
  
    globalUUID[uuidDapp] = { status: 'dapp' };

    dappView = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            sandbox: true,
            // contextIsolation: true,
            preload: path.join(VIEW_PATH, 'preload.js'),
            additionalArguments: [ '--uuid-renderer='.concat(uuidDapp) ]
        }
    });

    const bounds = {
        x: 300,
        y: 0,
        width: 300,
        height: 300
    };
      
    // clientWindow.setBrowserView(dappView);
    // dappView.setBounds(bounds);
    dappView.webContents.loadURL('file://' + path.join(VIEW_PATH, 'index.html'));

    return dappView;
}

module.exports = createDappView;



// view2 = new BrowserView({
//   webPreferences: {
//     nodeIntegration: false,
//     sandbox: true,
//     contextIsolation: true,
//     preload: path.join(VIEW_PATH, 'preload.js')
//   }
// });
// view2.webContents.loadURL('file://' + path.join(VIEW_PATH, 'index2.html'));
// process.stdout.write("BrowserView identificators: " + view.id + ", " + view2.id);
