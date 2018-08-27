/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserView, ipcMain, screen, BrowserWindow } from 'electron';
import { Store } from 'redux';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { configureStore } from './helpers/store/configureStore';
import { AppsManager } from './helpers/AppsManager';
import { createClientWindow } from './createClientWindow';
import { createDappView } from './createDappView';
import { RendererConf } from './createDappView';

require('electron-context-menu')({
	prepend: (params: any, browserWindow: BrowserWindow) => [{
    label: 'Pin to top',
		// Only show it when right-clicking images
		// visible: params.mediaType === 'image'
  },
  {
    label: 'Close app',
		// visible: params.mediaType === 'image'
	}]
});

const globalUUIDList: RendererConf[] = [];
let clientWindow: Electron.BrowserWindow = null;

if (process.env.ELECTRON_ENV === 'development') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize;
  let bounds = {
    x: 70,
    y: 60,
    width: 200,//width - 70,
    height: height - 60  
  };
 
  if (process.env.ELECTRON_ENV === 'development') {
    let devtools = await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    console.log(`Added Extension: ${devtools}`);
  }
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    clientWindow = createClientWindow(globalUUIDList);
  });
  clientWindow = createClientWindow(globalUUIDList);

  let appManager = new AppsManager();
  await appManager.parseDapps();
 
 
  // create multiple view and keep them around the memory, detached from the window
  // then switching workspaces is just and additional call to setBrowserView
  //const dappsIndexes: string[] = ['index.html', 'index2.html']; //todo pass AppsManager @instances
  let dappName: string;
  for (dappName of Object.keys(appManager.getAllDappsForPreview())) {
    const appItem = appManager.getAppItem(dappName);
    createDappView(globalUUIDList, appItem.main, appItem.appName);
  }
  
  const store: Store<{}> = configureStore(global.state, globalUUIDList);
  
  store.subscribe(() => {
    let storeState: any = store.getState();
    process.stdout.write(JSON.stringify(storeState));
    if (storeState.client.isHome && storeState.client.activeDapp.id == 0) {
      clientWindow.setBrowserView(null);
    } else {
      let activeDappName: string = storeState.client.activeDapp.appName;
      let nameObj: RendererConf = globalUUIDList.find(renObj => renObj.name === activeDappName);
      if (nameObj) {
        let view = nameObj.dappView;
        if (view) {
          clientWindow.setBrowserView(view);
          view.setBounds(bounds);  //{width: 0, height: 0, x: 0, y: 0}
        } else {
          clientWindow.setBrowserView(null);
          process.stdout.write('error: view is null');
        }
      }
    }
  });
});
process.stdout.write("Main initialized");
