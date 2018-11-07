import * as IPFS from 'ipfs';
import * as fs from 'fs';
import * as path from 'path';

import { remoteConfig } from './config/ipfs';
import { appTempPath } from './constants/appPaths';

const cleanRepo = async (repoPath: string) => {
  // This fixes a bug on Windows, where the daemon seems
  // not to be exiting correctly, hence the file is not
  // removed.
  console.log('Cleaning repo.lock file');
  const lockPath = path.join(repoPath, 'repo.lock');

  fs.access(lockPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.warn(`unable to access file here: ${lockPath}`);
    } // throw err;
    fs.unlink(lockPath, (err) => {
      if (err) {
        console.warn(`unable to delete file here: ${lockPath}`);
      } // throw err;
    });
  });
};

export const getReadyIpfsInstance = async (options: IPFS.Options = { repo: path.join(appTempPath, 'ipfs', 'repo') }): Promise<any> => {
  const ipfs = new IPFS({
    ...remoteConfig,
    repo: path.join(options.repo, Math.random().toString()),
  });

  await cleanRepo(options.repo);
  return new Promise((resolve, reject) => {
    ipfs.on('ready', () => {
      if (ipfs.isOnline()) {
        console.log('online');
        resolve(ipfs);
      } else {
        console.log('offline, try to start');
        ipfs.start();
      }
    });

    ipfs.on('error', (error: Error) => {
      reject(error);
    });
  });
};
