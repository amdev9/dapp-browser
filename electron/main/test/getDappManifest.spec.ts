import { DappManifestError } from '../modules/Errors';

const assert = require('assert');
const mock = require('mock-require');
const chai = require('chai');
const extra = require('fs-extra');
const chaiAsPromised = require('chai-as-promised');

const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid/v4');

import { rimraf, mkdirp } from '../helpers/utils';
import { testManifest, FOLDER_DAPP_TEMP, createTestDapp } from './hooks';
import { AppItem } from '../modules/AppsManager/models';

mock('ClientApp/modules/Dapp/actions', '../../client/modules/Dapp/actions');
const AppsManager = require('../modules/AppsManager/component').default;

chai.use(chaiAsPromised);

describe('getDappManifest', () => {

  describe('', () => {

    before(async () => {
      await createTestDapp(FOLDER_DAPP_TEMP, testManifest);
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Get manifest from valid test app', async () => {
      const dappManifest = await AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      assert.strictEqual(typeof dappManifest, 'object');
    });
  });

  it('Pass empty folder path to getDappManifest', async () => {
    const dappWithoutManifest = AppsManager.getDappManifest();

    const error = await dappWithoutManifest.should.be.rejected;
    chai.expect(error).to.have.property('code', 'ENOENT');
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Dapp folder exist, but manifest.json does not exist', async () => {
      const dappWithoutManifest = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappWithoutManifest.should.be.rejected;
      chai.expect(error).to.have.property('code', 'ENOENT');
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Dapp folder exist, but manifest.json does not exist', async () => {
      const dappWithoutManifest = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappWithoutManifest.should.be.rejected;
      chai.expect(error).to.have.property('code', 'ENOENT');
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      await fs.writeFile(path.join(FOLDER_DAPP_TEMP, 'manifest.json'), '');
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Get dapp manifest from invalid json file', async () => {
      const dappWithoutManifest = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      await dappWithoutManifest.should.be.rejectedWith(SyntaxError);
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      await fs.writeFile(path.join(FOLDER_DAPP_TEMP, 'manifest.json'), '', { mode: 0o000 });
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Parse manifest if manifest.json has no access', async () => {
      const dappManifestPromise = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappManifestPromise.should.be.rejected;
      chai.expect(error).to.have.property('code', 'EACCES');
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      await createTestDapp(FOLDER_DAPP_TEMP, testManifest);
      fs.unlink(path.join(FOLDER_DAPP_TEMP, testManifest.icon));
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Parse manifest if dapp has no icon file', async () => {
      const dappManifestPromise = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappManifestPromise.should.be.rejectedWith(DappManifestError);
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      await createTestDapp(FOLDER_DAPP_TEMP, testManifest);
      fs.unlink(path.join(FOLDER_DAPP_TEMP, testManifest.preview));
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Parse manifest if dapp has no preview icon file', async () => {
      const dappManifestPromise = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappManifestPromise.should.be.rejectedWith(DappManifestError);
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      await createTestDapp(FOLDER_DAPP_TEMP, testManifest);
      fs.unlink(path.join(FOLDER_DAPP_TEMP, testManifest.main));
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Parse manifest if dapp has no main html file', async () => {
      const dappManifestPromise = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappManifestPromise.should.be.rejectedWith(DappManifestError);
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      const manifest: AppItem = { ... testManifest, appName: null };
      await createTestDapp(FOLDER_DAPP_TEMP, manifest);
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Parse manifest if dapp has no app name', async () => {
      const dappManifestPromise = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappManifestPromise.should.be.rejectedWith(DappManifestError);
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
      await mkdirp(FOLDER_DAPP_TEMP);
      const manifest: AppItem = { ... testManifest, title: null };
      await createTestDapp(FOLDER_DAPP_TEMP, manifest);
    });

    after(async () => {
      await rimraf(FOLDER_DAPP_TEMP);
    });

    it('Parse manifest if dapp has no title', async () => {
      const dappManifestPromise = AppsManager.getDappManifest(FOLDER_DAPP_TEMP);

      const error = await dappManifestPromise.should.be.rejectedWith(DappManifestError);
    });
  });

});
