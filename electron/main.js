/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

const { app, BrowserWindow, BrowserView, dialog } = require('electron');
const path = require('path');
const uuidv4 = require('uuid/v4');

const configureStore = require('./store/configureStore');
const createClientWindow = require('./createClientWindow');
const createDappView = require('./createDappView');

const RENDERER_PATH = path.join(__dirname, 'client');
const VIEW_PATH = path.join(__dirname, 'dapps');

let win, view, view2;
let bounds = {
  x: 300,
  y: 0,
  width: 600,
  height: 600
};

app.on('ready', () => {
  const store = configureStore(global.state, 'main');

  process.stdout.write(JSON.stringify(store.getState()));
  
  store.subscribe( () => {
    process.stdout.write(JSON.stringify(store.getState()));
  });

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  // const uuidClient = uuidv4(); // ⇨ '45db52e1-f95c-4b5f-99a2-8b8d978c99b4'

  // app.on('activate', () => {
  //   // On OS X it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   clientWindow = createClientWindow(uuidClient);
  // });
  clientWindow = createClientWindow(); // uuidClient

  // create multiple view and keep them around the memory, detached from the window
  // then switching workspaces is just and additional call to setBrowserView
  
  const uuidDapp = uuidv4();
  process.stdout.write(uuidDapp);
  dappView = createDappView(clientWindow, uuidDapp);

});

process.stdout.write("Main initialized");

// In main process.
const ipcMain = require('electron').ipcMain;

ipcMain.once('answer', (event, argv) => {
  // process.stdout.write(JSON.stringify(argv));
  
  console.log(argv);

  // argv.forEach((val, index) => {
  //   process.stdout.write(`\n${index}: ${val}`);
  // });
});


ipcMain.on('rpc-switch', function (event, rpc, arg) {
  process.stdout.write("RPC REQUEST: " + rpc);
  switch (+rpc) {
    case 1:
      win.setBrowserView(view);
      view.setBounds(bounds);
      break;
    case 2:
      win.setBrowserView(view2);
      view2.setBounds(bounds);
      break;
    default:
      alert("No such browserview");
  }
});

// ipc identification and communication between renderers through actions
// https://electronjs.org/docs/api/browser-window
// https://electronjs.org/docs/api/ipc-main

