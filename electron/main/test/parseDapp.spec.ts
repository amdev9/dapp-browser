const assert = require('assert');
const mock = require('mock-require');
const path = require('path');

mock('ClientApp/modules/Dapp/actions', '../../client/modules/Dapp/actions');

const AppsManager = require('../modules/AppsManager/component').default;

describe('Dapp download and parse', () => {

  it('Download and parse dapp with manifest', async () => {
    const dappManifest = await AppsManager.getDappManifest(path.join(__dirname, '../../dapps/download', 'Wallet'));

    assert.strictEqual(typeof dappManifest, 'object');
  });

  it('Download and parse dapp without manifest ', async () => {
    const dappWithoutManifest = await AppsManager.getDappManifest(path.join(__dirname, '../../dapps/download', 'NONEXISTING_DAPP'));

    assert.strictEqual(typeof dappWithoutManifest, 'undefined');
  });

});
