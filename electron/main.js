/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

const { app, BrowserView } = require('electron');
const configureStore = require('./redux/store/configureStore');
const createClientWindow = require('./createClientWindow');
const createDappView = require('./createDappView');

 
//todo
// 1 interaction between dapps
// 2 subscribe to event when result is available
// 3 one dapp has heavy method foo() to run and return some value
// others dapp want to run this method and do it simultaniously

let bounds = {
  x: 300,
  y: 0,
  width: 300,
  height: 300
};

const globalUUIDList = [];

app.on('ready', () => {
  const store = configureStore(global.state, globalUUIDList);
  process.stdout.write(JSON.stringify(store.getState()));
  
  store.subscribe( () => {
    process.stdout.write(JSON.stringify(store.getState()));

    let activeDappName = store.getState().client.activeDapp;
    // console.log('activeDappName', activeDappName);
    let nameObj = globalUUIDList.find(renObj => renObj.name === activeDappName);
    if (nameObj) {
      // console.log('nameObj', nameObj);
      let view = BrowserView.fromId(nameObj.viewId);
      clientWindow.setBrowserView(view);
      view.setBounds(bounds); 
    }
  });

  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    clientWindow = createClientWindow(globalUUIDList);
  });
  clientWindow = createClientWindow(globalUUIDList);  
  console.log(clientWindow);

  // create multiple view and keep them around the memory, detached from the window
  // then switching workspaces is just and additional call to setBrowserView
  const dappsIndexes = ['index.html', 'index2.html'];
  for (dappInd of dappsIndexes) {
    dappView = createDappView(clientWindow, globalUUIDList, dappInd);
  }
  
  process.stdout.write(JSON.stringify(globalUUIDList) );
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

  