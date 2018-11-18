/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserWindow, Menu, dialog, protocol } from 'electron';
import { Store } from 'redux';
import { Observable, ReplaySubject } from 'rxjs';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { configureStore, initialState } from './helpers/store/configureStore';
import { AppsManager, AppItem } from './helpers/AppsManager';
import { DappFrame } from './helpers/DappFrame';
import { createClientWindow } from './createClientWindow';
import { RendererConf, globalUUIDList } from './helpers/constants/globalVariables';
import { IState, Client } from './helpers/reducers/state';
import { getDefaultExecPath, Keychain } from './helpers/Keychain';
import * as path from 'path';
const KEYCHAIN_PATH = path.join(__dirname, '..', 'helpers', 'Keychain', getDefaultExecPath());

import * as nodeConsole from 'console';
import { NetworkAPI } from './helpers/Network';
import ClientManager from './helpers/ClientManager';
import * as httpProtocolActions from './helpers/actions/httpProtocol';
import { activeDappSelector } from './helpers/selectors';
import * as clientActions from './helpers/actions/client';

const console = new nodeConsole.Console(process.stdout, process.stderr);

export const isProduction = process.env.ELECTRON_ENV !== 'development';
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

const replayOpenUrls = new ReplaySubject();
// Mac OS X sends url to open via this event
app.on('open-url', (e, url) => {
  // e.preventDefault();
  replayOpenUrls.next(url);
  console.log('open-url', url);
});

app.on('ready', async () => {

  if (process.env.ELECTRON_ENV === 'development') {
    const devtools = await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    console.log(`Added Extension: ${devtools}`);
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  await AppsManager.parseDapps();

  let keysList: string[] = [];
  try {
    const keychainInstance = new Keychain(KEYCHAIN_PATH);
    keysList = await keychainInstance.list();
  } catch (e) {
    console.log('keychain list error: ', e);
  }

  store = configureStore({
    ...initialState,
    client: { ...initialState.client, keychain: { items: keysList } },
    feed: { items: AppsManager.dapps },
  }, globalUUIDList);
  // Mac OS X sends url to open via this event
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // clientWindow = createClientWindow(globalUUIDList, store);
  });

  new ClientManager(store);

  clientWindow = ClientManager.createClientWindow();

  store.subscribe(() => {
    const storeState = store.getState();
    process.stdout.write(JSON.stringify(storeState));
  });

  // Subscribe on links after create client window
  replayOpenUrls.subscribe((value: string) => {
    store.dispatch(httpProtocolActions.httpProtocolOpenLink(value));
  });

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  clientWindow.webContents.on('did-finish-load', () => {
    if (!clientWindow) {
      throw new Error('"clientWindow" is not defined');
    }
    clientWindow.show();
    clientWindow.focus();

    const activeDapp = activeDappSelector(store.getState());
    if (activeDapp) {
      store.dispatch(clientActions.switchDapp(activeDapp));
    }
  });

  clientWindow.on('closed', () => {
    clientWindow = null;
    app.quit();
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

  // if (isProduction) {
  //   clientWindow.on('resize', () => correctDappViewBounds(store.getState().client));
  //   clientWindow.on('maximize', () => correctDappViewBounds(store.getState().client));
  //   clientWindow.on('restore', () => correctDappViewBounds(store.getState().client));
  // }
});

process.stdout.write('Main initialized');
