/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

const { app, BrowserView, ipcMain } = require('electron');
const configureStore = require('./helpers/store/configureStore');
const createClientWindow = require('./createClientWindow');
const createDappView = require('./createDappView');

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
    createDappView(globalUUIDList, dappInd);
  }
  
  /* BrowserView
   *
   * 
   * 
    
    
    let view = BrowserView.fromId(1);
    clientWindow.setBrowserView(view);
    view.setBounds(bounds); 
  */

  const store = configureStore(global.state, globalUUIDList);
  process.stdout.write(JSON.stringify(store.getState()));
  
  store.subscribe( () => {
    process.stdout.write(JSON.stringify(store.getState()));

    let activeDappName = store.getState().client.activeDapp;
 
    let nameObj = globalUUIDList.find(renObj => renObj.name === activeDappName);
    if (nameObj) {
      /* BrowserView
      // let view = BrowserView.fromId(nameObj.viewId);
      // clientWindow.setBrowserView(view);
      // view.setBounds(bounds); 
      */
    }
    
    //todo3
    // ask for permission before renderer process starts, add map { channelProposal: '[PERMISSION/PROPOSAL]', channelId: '[CHANNEL_ID]'}
    // When renderer init data sending through channel he pass action, preload script add payload:
    // ex.: { type: INTENT_CHANNEL_DATA_PASS, payload: { uuid: '[UUID_RECEIVER_RENDERER]', channelProposal: '[PERMISSION/PROPOSAL]' } } 
    // Main process validate uuid and resolve CHANNEL_ID, pub action: 
    // ex.: { type: 'ACCEPT_CHANNEL_DATA_PASS', payload: { channelId: '[CHANNEL_ID]', uuid: '[UUID_RECEIVER_RENDERER]' } }
    // Renderer pass data through given '[CHANNEL_ID]'
    
    //todo4
    // Local Storage roadmap:
    // ask for permission before renderer process starts, add map { channelProposal: '[PERMISSION/PROPOSAL]', channelId: '[CHANNEL_ID]'}
    // Renderer init subscription ex: { type: 'INIT_EVENT_SUBSCRIPTION', payload: { channelProposal: '[PERMISSION/PROPOSAL]', additionalParams: {...} } }
    // Main process add event trigger condition to own side map (eventMap), check if action passed through main contains in eventMap.
    // Event triggered action: { type: 'EVENT_TRIGGERED', payload: { channelProposal: '[PERMISSION/PROPOSAL]', triggered: { type: { 'LOCAL_STORAGE_SET_SUCCESS', payload: {...} } } } }
    // Renderer answer: { type: 'EVENT_RECEIVED', payload: channelProposal: '[PERMISSION/PROPOSAL]', additionalParams: {...} }
    // Render can init now opening channel for data passing, etc.
  

    //todo on BIND_OPEN_CHANNELS bind channels
    // let bindedChannel = store.getState().main.channel;
    // if (bindedChannel) { // when got action that channels is just binded
    //   let channelIdSendObj = globalUUIDList.find(renObj => renObj.channel === bindedChannel.sender);
    //   let channelIdReceiveObj = globalUUIDList.find(renObj => renObj.channel === bindedChannel.receiver);
    //   ipcMain.on(channelIdSendObj.channel, (event, uuid, payload) => {
    //     let bindedView = BrowserView.fromId(channelIdSendObj.viewId);
    //     bindedView.webContents.send(channelIdReceiveObj.channel, uuid, payload);
    //   });
    //   // channels now opened store.dispatch BIND_OPEN_CHANNELS_DONE
    // }
  });
  process.stdout.write(JSON.stringify(globalUUIDList));
});

process.stdout.write("Main initialized");

// In main process.
 
ipcMain.once('answer', (event, argv) => {
  console.log(argv);
});
