/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserWindow, Menu, dialog } from 'electron';
import { Store } from 'redux';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { configureStore, initialState } from './helpers/store/configureStore';
import { AppsManager, AppItem } from './helpers/AppsManager';
import { DappFrame } from './helpers/DappFrame';
import { createClientWindow } from './createClientWindow';
import { createPermissionWindow } from './createPermissionWindow';
import { createDappView, RendererConf } from './createDappView';
import { IState, Client } from './helpers/reducers/state';

import * as nodeConsole from 'console';
import { NetworkAPI } from './helpers/Network';

const console = new nodeConsole.Console(process.stdout, process.stderr);

const isProduction = process.env.ELECTRON_ENV !== 'development';
let store: Store<IState>;

require('electron-context-menu')({
  prepend: (params: any, browserWindow: BrowserWindow) => [{
    label: 'Pin to top',
    // Only show it when right-clicking images
    // visible: params.mediaType === 'image'
  },
  {
    label: 'Close app',
      // visible: params.mediaType === 'image'
    click: (e: any) => {
      store.dispatch({ type: 'REMOVE_TRAY_ITEM', payload: { targetDappName: 'Game' } }); // todo how to determine app name where the click has been made?
    },
  }],
});

let template: any[] = [];
if (process.platform === 'darwin') {
  // OS X
  template.unshift({
    label: 'Array.io',
    submenu: [
      {
        label: 'About Array.io',
        role: 'about',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        },
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
          { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
        ],
      },
    ],
  });
} else {
  // Win, Linux
  template = [{
    label: 'Array.io',
    submenu: [{
      label: 'Выход',
      accelerator: 'Command+Q',
      click() {
        app.quit();
      },
    }],
  }];
}

const globalUUIDList: RendererConf[] = [];
let clientWindow: Electron.BrowserWindow = null;

if (process.env.ELECTRON_ENV === 'development') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

// Enables full sandbox mode
// app.enableSandbox();

let networkAPI: NetworkAPI;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }

  try {
    networkAPI.removeAllSubscribers();
  } catch (error) {
    console.log(error);
    dialog.showMessageBox(clientWindow, {
      type: 'warning',
      title: 'Warning',
      message: 'NetworkAPI problems',
    });
  }
});

// Mac OS X sends url to open via this event
app.on('open-url', (e, url) => {
  console.log('open-url', url);
});

app.on('ready', async () => {

  if (process.env.ELECTRON_ENV === 'development') {
    const devtools = await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    console.log(`Added Extension: ${devtools}`);
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    clientWindow = createClientWindow(globalUUIDList);
  });
  clientWindow = createClientWindow(globalUUIDList);
  await AppsManager.parseDapps();

  store = configureStore({
    ...initialState,
    feed: { items: AppsManager.dapps },
  }, globalUUIDList);

  let pmIsOpen = false;
  const closePermissionManager = () => {
    pmIsOpen = false;
    if (permissionWindow) {
      permissionWindow.close();
      permissionWindow = null;
    }
  };
  let permissionWindow: BrowserWindow;

  let isClientWindowLoaded = false;

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  clientWindow.webContents.on('did-finish-load', () => {
    isClientWindowLoaded = true;
    if (!clientWindow) {
      throw new Error('"clientWindow" is not defined');
    }
    clientWindow.show();
    clientWindow.focus();
  });

  try {
    networkAPI = new NetworkAPI(store);
    networkAPI.init();
  } catch (error) {
    console.log(error);
    dialog.showMessageBox(clientWindow, {
      type: 'warning',
      title: 'Warning',
      message: 'NetworkAPI problems',
    });
  }

  store.subscribe(() => {
    const storeState = store.getState();

    process.stdout.write(JSON.stringify(storeState));

    if (storeState.client.isHome) {
      clientWindow.setBrowserView(null);
    } else {
      const activeDappName: string = storeState.client.activeDapp.appName;

      const targetDappObj: AppItem = AppsManager.dapps.find(dappObj => dappObj.appName === activeDappName);

      // @todo pass approved permissions back, close created window on 'APPROVE' button clicked,
      // add data from permissionManager to state, on next action dispatch check state for permissions data exists,
      // do not open permissionManager window if so.

      // if (approve)
      // permissionWindow.close();

      // @todo create on permissions granted
      createDappView(globalUUIDList, targetDappObj);

      const nameObj: RendererConf = globalUUIDList.find(renObj => renObj.name === activeDappName && renObj.status === 'dapp');
      if (nameObj) {
        const view = nameObj.dappView;
        if (view) {
          clientWindow.setBrowserView(view);
          if (isClientWindowLoaded) {
            if (!pmIsOpen) {  // Linux. If not to check isClientWindowLoaded, than permissionWindow loads before clientWindow and shows behind clientWindow
              const activeDappGranted = storeState.permissionManager.grantedApps.indexOf(activeDappName) !== -1;
              if (!activeDappGranted) {
                permissionWindow = createPermissionWindow(globalUUIDList, clientWindow, targetDappObj.appName, targetDappObj.permissions);
                permissionWindow.on('closed', () => {
                  pmIsOpen = false;
                  permissionWindow = null;
                });
                pmIsOpen = true;
              }
            } else {
              if (!storeState.permissionManager.isOpen) {
                closePermissionManager();
              }
            }
          }
        } else {
          clientWindow.setBrowserView(null);
          process.stdout.write('error: view is null');
        }
      }
    }
    correctDappViewBounds(storeState.client);
  });

  if (isProduction) {
    clientWindow.on('resize', () => correctDappViewBounds(store.getState().client));
    clientWindow.on('maximize', () => correctDappViewBounds(store.getState().client));
    clientWindow.on('restore', () => correctDappViewBounds(store.getState().client));
  }
});

const correctDappViewBounds = (clientState: Client) => {
  if (!clientWindow) {
    process.stdout.write('Trying to send bounds of Dapp View while its parent window has not been initialized');
    return;
  }

  const view = clientWindow.getBrowserView();
  const windowBounds = clientWindow.getBounds();
  if (view) {
    const dappFrame: Electron.Rectangle = new DappFrame(clientState, isProduction ? windowBounds : null);
    view.setBounds(dappFrame);
  }
};

process.stdout.write('Main initialized');
