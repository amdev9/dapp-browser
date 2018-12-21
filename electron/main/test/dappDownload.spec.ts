const assert = require('assert');
const mock = require('mock-require');
mock('ClientApp/modules/Dapp/actions', '../../client/modules/Dapp/actions');

const AppsManager = require('../modules/AppsManager/component').default;

describe('Dapp download and parse', () => {

  it('Download and parse dapp with manifest', async () => {
    const dappPath = await AppsManager.downloadDapp('QmeN8trCSyJ3ndhY21NzmKoAtXLRxKBKBBW2eGJnLVPMqj');
    const dappManifest = await AppsManager.getDappManifest(dappPath);

    assert.strictEqual(typeof dappManifest, 'object');
  });

  it('Download and parse dapp without manifest ', async () => {
    const dappPathWithoutManifest = await AppsManager.downloadDapp('QmNiyUzGWLf8cqbrzM7nwNAjRoUjTJuK6C6raamLR4uNdU');
    const dappWithoutManifest = await AppsManager.getDappManifest(dappPathWithoutManifest);

    assert.strictEqual(typeof dappWithoutManifest, 'undefined');
  });

});
