/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserView, ipcMain } from 'electron';
import { Store } from 'redux';
import { configureStore } from './helpers/store/configureStore';
import { createClientWindow } from './createClientWindow';
import { createDappView } from './createDappView';
import { RendererConf } from './createDappView';

let bounds = {
  x: 300,
  y: 0,
  width: 300,
  height: 300
};

const globalUUIDList: RendererConf[] = [];
let clientWindow: Electron.BrowserWindow = null;

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

  // create multiple view and keep them around the memory, detached from the window
  // then switching workspaces is just and additional call to setBrowserView
  const dappsIndexes: string[] = ['index.html', 'index2.html'];
  let dappInd: string;
  for (dappInd of dappsIndexes) {
    createDappView(globalUUIDList, dappInd);
  }
  
  /* BrowserView
    let view = BrowserView.fromId(1);
    clientWindow.setBrowserView(view);
    view.setBounds(bounds); 
  */

  const store: Store<{}> = configureStore(global.state, globalUUIDList);
  
  store.subscribe( () => {
    let storeState: any = store.getState();
    process.stdout.write(JSON.stringify(storeState));

    let activeDappName: string = storeState.client.activeDapp;

    let nameObj: object = globalUUIDList.find(renObj => renObj.name === activeDappName);
    if (nameObj) {
      /* BrowserView
        let view = BrowserView.fromId(nameObj.viewId);
        clientWindow.setBrowserView(view);
        view.setBounds(bounds); 
      */
    }
  });
  process.stdout.write(JSON.stringify(globalUUIDList));
});

process.stdout.write("Main initialized");

// In main process.
// ipcMain.once('answer', (event: Electron.Event, argv: any) => {
//   console.log(argv);
// });
