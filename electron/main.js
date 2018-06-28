/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

const { app, BrowserView } = require('electron');
const configureStore = require('./redux/store/configureStore');
const createClientWindow = require('./createClientWindow');
const createDappView = require('./createDappView');

//todo
// interaction between dapps / data passing:
// 1. static reactive +
// (1) SEND_MESSAGE from one dapp to another, dappIdFrom, dappIdTo => check permissions => init connection / pass message

  // case INIT_IPC_CONNECTION between dappIdFrom to dappIdTo: (dappIdFrom -> main -> dappIdTo) convert to abstraction

  // //Send the 'SEND_MESSAGE' action down the websocket to the server
  // case WEBSOCKET_SEND: //'SEND_CHAT_MESSAGE':
  //   store.dispatch(actions.sending());
  //   socket.send(JSON.stringify(action)); // change to ipc
  //   break;
    
// 2. pub-sub
// (2) GET_LOCAL_STORAGE (emulate with foo function), payload: data for foo input, dappId where foo placed.
  // => check for permission => subcribe for event calculated: false, change state => sync with renderer store => get result

// - subscribe to event when result is available - observable
// - one dapp has heavy method foo() to run and return some value
// others dapp want to run this method and do it simultaniously

let bounds = {
  x: 300,
  y: 0,
  width: 300,
  height: 300
};

const globalUUIDList = [];

app.on('ready', () => {
  

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
    // dappView = 
    createDappView(clientWindow, globalUUIDList, dappInd);
  }
  
  // process.stdout.write('length from main ' + BrowserView.getAllViews().length);
  let view = BrowserView.fromId(1);
  // console.log('----->', view);
  clientWindow.setBrowserView(view);
  view.setBounds(bounds); 

  const store = configureStore(global.state, globalUUIDList);
  process.stdout.write(JSON.stringify(store.getState()));
  
  store.subscribe( () => {
    process.stdout.write(JSON.stringify(store.getState()));

    let activeDappName = store.getState().client.activeDapp;
    // console.log('activeDappName', activeDappName);
    let nameObj = globalUUIDList.find(renObj => renObj.name === activeDappName);
    if (nameObj) {
      // console.log('>>>> nameObj', nameObj);
      // console.log('>>> length', BrowserView.getAllViews().length);
      let view = BrowserView.fromId(nameObj.viewId);
        // console.log('----->', view);
        clientWindow.setBrowserView(view);
        view.setBounds(bounds); 
    }
  });


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

  