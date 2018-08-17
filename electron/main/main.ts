/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserView, ipcMain } from 'electron';
import { Store } from 'redux';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
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

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development') {
    let devtools = await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    console.log(`Added Extension: ${devtools}`);
  }
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
  
  const store: Store<{}> = configureStore(global.state, globalUUIDList);
  
  store.subscribe( () => {
    let storeState: any = store.getState();
    process.stdout.write(JSON.stringify(storeState));

    if(storeState.client.activeDapp) {
      let activeDappName: string = storeState.client.activeDapp.appName;

      let nameObj: RendererConf = globalUUIDList.find(renObj => renObj.name === activeDappName);
      if (nameObj) {
        process.stdout.write(JSON.stringify( nameObj ) );
         
        let view = BrowserView.fromId(nameObj.viewId);
        process.stdout.write(  JSON.stringify(BrowserView.getAllViews()) );
        
        if (view) {
          clientWindow.setBrowserView(view);
          view.setBounds(bounds); 
        } else {
          // clientWindow.setBrowserView(null); // @todo use it when user clicked on Home button
          process.stdout.write('error: view is null');
        }
        
        /**/
 
      }
    }
  });
  process.stdout.write(JSON.stringify(globalUUIDList));
  
});
process.stdout.write("Main initialized");

// In main process.
// ipcMain.once('answer', (event: Electron.Event, argv: any) => {
//   console.log(argv);
// });
