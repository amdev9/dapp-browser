const assert = require('assert');
const mock = require('mock-require');

const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid/v4');

const hooks = require('./hooks');
import { rimraf, mkdirp } from '../helpers/utils';

mock('ClientApp/modules/Dapp/actions', '../../client/modules/Dapp/actions');
const AppsManager = require('../modules/AppsManager/component').default;

describe('getDappManifest', () => {

  const downloadDappPath = path.join(__dirname, '../../dapps/download');

  describe('Get from valid manifest.json', () => {
    const FOLDER_DAPP_WALLET = path.join(downloadDappPath, 'Wallet');

    it('Get dapp manifest from Wallet dapp', async () => {
      const dappManifest = await AppsManager.getDappManifest(FOLDER_DAPP_WALLET);

      assert.strictEqual(typeof dappManifest, 'object');
    });
  });

  describe('Get dapp manifest from non existing path', () => {
    const FOLDER_DAPP_NON_EXISTING = path.join(downloadDappPath, 'FOLDER_DAPP_NON_EXISTING');

    it('Get dapp manifest from non existing dapp folder', async () => {
      const dappWithoutManifest = await AppsManager.getDappManifest(FOLDER_DAPP_NON_EXISTING);

      assert.strictEqual(typeof dappWithoutManifest, 'undefined');
    });
  });

  describe('Get dapp manifest from invalid json file', () => {
    const FOLDER_DAPP_INVALID_MANIFEST = path.join(downloadDappPath, 'FOLDER_DAPP_INVALID_MANIFEST');

    before(async () => {
      await rimraf(FOLDER_DAPP_INVALID_MANIFEST);
      await mkdirp(FOLDER_DAPP_INVALID_MANIFEST);
      await fs.writeFile(path.join(FOLDER_DAPP_INVALID_MANIFEST, 'manifest.json'), '');
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_INVALID_MANIFEST);
    });

    it('Get dapp manifest from invalid manifest file', async () => {
      const dappWithoutManifest = await AppsManager.getDappManifest(FOLDER_DAPP_INVALID_MANIFEST);

      assert.strictEqual(typeof dappWithoutManifest, 'undefined');
    });
  });

});
