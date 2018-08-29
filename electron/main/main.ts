/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserView, ipcMain, screen, BrowserWindow } from 'electron';
import { Store } from 'redux';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { configureStore, initialState } from './helpers/store/configureStore';
import { AppsManager, AppItem } from './helpers/AppsManager';
import { createClientWindow } from './createClientWindow';
import { createDappView } from './createDappView';
import { RendererConf } from './createDappView';

import * as path from 'path';

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


  //////
const DAPPS_PATH: string = path.join(__dirname, '..', '..', 'client');
const popuWindowOffsetX = 500;
const popuWindowOffsetY = 150;
const popupWindow = new BrowserWindow({
  x: clientWindow.getPosition()[0] + popuWindowOffsetX,
  y: clientWindow.getPosition()[1] + popuWindowOffsetY,
  show: false,
  width: 150,
  height: 250,
  transparent: true,
  frame: false,
  resizable: false,
  //alwaysOnTop: true,
  parent: clientWindow
});
popupWindow.webContents.loadURL('file://' + path.join(DAPPS_PATH, "indexOverlay.html"));
/*popupWindow.on('blur', () => {
  popupWindow.close();
});*/
const correctPopupWindowPosition = (e: any) => {
  const bounds = e.sender.getBounds();
  popupWindow.setPosition(bounds.x + popuWindowOffsetX, bounds.y + popuWindowOffsetY);
};
clientWindow.on('move',(e: any) => correctPopupWindowPosition(e));
clientWindow.on('resize',(e: any) => correctPopupWindowPosition(e));
clientWindow.on('maximize',(e: any) => correctPopupWindowPosition(e));
clientWindow.on('restore',(e: any) => correctPopupWindowPosition(e));
popupWindow.show();
//////



  // let appManager = new AppsManager();
  await AppsManager.parseDapps();
 
 
 
  // create multiple view and keep them around the memory, detached from the window
  // then switching workspaces is just and additional call to setBrowserView
  //const dappsIndexes: string[] = ['index.html', 'index2.html']; //todo pass AppsManager @instances
  let dapp: AppItem;
  for (dapp of AppsManager.dapps) {
    createDappView(globalUUIDList, dapp);
  }
 

  const store: Store<{}> = configureStore({
    ...initialState,
    feed: {items: AppsManager.dapps}
  }, globalUUIDList); //@todo pass parsed dapps

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
