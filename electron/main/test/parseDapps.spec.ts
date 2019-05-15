import * as path from 'path';
import { promises as fs } from 'fs';
import * as chai from 'chai';
import * as assert from 'assert';

import { mkdirp, rimraf } from '../helpers/utils';
import { DappDublicateError, DappManifestError } from '../modules/Errors';
import { testManifest, FOLDER_DAPPS_TEMP, createTestDapp } from './hooks';
import AppsManager from '../modules/AppsManager/component';

describe('parseDapps', () => {

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPPS_TEMP);
    });

    it('Parse dapps folder if folder does not exist', async () => {
      const dapps = await AppsManager.parseDapps();

      chai.expect(dapps).to.be.an('dapp').that.is.empty;
    });
  });

  describe('', () => {

    before(async () => {
      await rimraf(FOLDER_DAPPS_TEMP);
      await mkdirp(FOLDER_DAPPS_TEMP);
      await createTestDapp(path.join(FOLDER_DAPPS_TEMP, 'dappFolder1'), testManifest);
      await createTestDapp(path.join(FOLDER_DAPPS_TEMP, 'dappFolder2'), testManifest);
    });

    after(async () => {
      await rimraf(FOLDER_DAPPS_TEMP);
    });

    it('Parse dapps folder if we have two dublicate dapps', async () => {
      const parseDappPromise = AppsManager.parseDapps();

      const error = await parseDappPromise.should.be.rejectedWith(DappDublicateError);
    });
  });
});
