import { AppItem } from '../modules/AppsManager/models';
import { mkdirp, rimraf } from '../helpers/utils';
import { dappsTempPath } from '../helpers/constants/appPaths';

const Application = require('spectron').Application;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const electron = require('electron');
const path = require('path');
const fs = require('fs').promises;

global.before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

export const FOLDER_DAPPS_TEMP = dappsTempPath;
export const FOLDER_DAPP_TEMP = path.join(FOLDER_DAPPS_TEMP, 'FOLDER_DAPP_TEMP');

export const testManifest: AppItem = {
  'title': 'Test application',
  'main': 'index.html',
  'appName': 'TestApp',
  'icon': 'icon.png',
  'preview': 'preview.png',
  'categories': [],
  'permissions': [],
};

export const createTestDapp = async (folder: string, manifest: AppItem) => {
  await rimraf(folder);
  await mkdirp(folder);
  await fs.writeFile(path.join(folder, 'manifest.json'), JSON.stringify(manifest));
  await fs.writeFile(path.join(folder, manifest.icon), '');
  await fs.writeFile(path.join(folder, manifest.preview), '');
  await fs.writeFile(path.join(folder, manifest.main), '<div>Hello, world!</div>');
};

export const startApp = async() => {
  const app = await new Application({
    path: electron,
    args: [path.join(__dirname, '..')]
  }).start();
  chaiAsPromised.transferPromiseness = app.transferPromiseness;
  return app;
};

export const stopApp = async (app: any) => {
  if (app && app.isRunning()) {
    await app.stop();
  }
};
