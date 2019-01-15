/*
  Informative comments provided by https://www.blackhat.com/docs/us-17/thursday/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf
  Uses process.stdout.write instead of console.log so we can cleanly catch the output in the parent process.
*/

import { app, BrowserWindow, Menu, dialog, MenuItem, protocol } from 'electron';
import { Store } from 'redux';
import { ReplaySubject } from 'rxjs';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import * as path from 'path';
import * as nodeConsole from 'console';
import { configureStore, initialState } from './helpers/store/configureStore';
import { globalUUIDList } from './helpers/constants/globalVariables';
import { IState } from './helpers/reducers/state';
import contextMenu from './contextMenu';
import { getDefaultExecPath, Keychain } from './helpers/systemComponents/Keychain';
import { NetworkAPI } from './helpers/systemComponents/Network';
import ClientManager from './helpers/systemComponents/ClientManager';
import StoreManager from './helpers/systemComponents/StoreManager';

import { component as AppsManager, actions as AppsManagerActions } from './modules/AppsManager';
import { component as Dapp } from './modules/Dapp';
import { component as HttpProtocol } from './modules/HttpProtocol';

const KEYCHAIN_PATH = path.join(__dirname, '..', 'helpers', 'systemComponents', 'Keychain', getDefaultExecPath());
const console = new nodeConsole.Console(process.stdout, process.stderr);

export const isProduction = process.env.ELECTRON_ENV !== 'development';
let store: Store<IState>;

contextMenu({
  prepend: (params: any, browserWindow: BrowserWindow) => [{
    label: 'Close app',
    click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
      const dapp = Dapp.getDappByName(params.titleText);

      if (dapp) {
        store.dispatch(AppsManagerActions.onDappClose(dapp.uuid));
      }
    },
  }],
  showInspectElement: false,
  shouldShowMenu: (event: any, params: any) => params.titleText !== '',
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
  const dapps = await AppsManager.parseDapps();

  let keysList: string[] = [];
  try {
    const keychainInstance = new Keychain(KEYCHAIN_PATH);
    keysList = await keychainInstance.list();
  } catch (e) {
    console.log('keychain list error: ', e);
  }

  store = configureStore({
    ...initialState,
    client: { ...initialState.client, keychain: { ...initialState.client.keychain, items: keysList } },
    feed: { items: dapps },
  }, globalUUIDList);

  StoreManager.store = store;

  clientWindow = ClientManager.createClientWindow();

  store.subscribe(() => {
    const storeState = store.getState();
    AppsManager.correctDappViewBounds(clientWindow);
    process.stdout.write(JSON.stringify(storeState));
  });

  HttpProtocol.registerHttpProtocol();
  // Subscribe on links after create client window
  replayOpenUrls.subscribe((value: string) => {
    HttpProtocol.openLink(value);
  });

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  clientWindow.webContents.on('did-finish-load', () => {
    if (!clientWindow) {
      throw new Error('"clientWindow" is not defined');
    }
    clientWindow.show();
    clientWindow.focus();

    const activeDapp = Dapp.getActiveDappName();
    if (activeDapp) {
      AppsManager.openDapp(activeDapp);
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

  clientWindow.on('resize', () => AppsManager.correctDappViewBounds(clientWindow));
  clientWindow.on('maximize', () => AppsManager.correctDappViewBounds(clientWindow));
  clientWindow.on('restore', () => AppsManager.correctDappViewBounds(clientWindow));
});

process.stdout.write('Main initialized');
