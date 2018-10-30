import * as IPFS from 'ipfs';
import * as fs from 'fs';
import * as path from 'path';

import { remoteConfig } from './config/ipfs';

const cleanRepo = (repoPath: string) => {
  // This fixes a bug on Windows, where the daemon seems
  // not to be exiting correctly, hence the file is not
  // removed.
  console.log('Cleaning repo.lock file')
  const lockPath = path.join(repoPath, 'repo.lock')

  if (fs.existsSync(lockPath)) {
    try {
      fs.unlinkSync(lockPath)
    } catch (err) {
      console.warn('Could not remove repo.lock. Daemon might be running')
    }
  }
}

export const getReadyIpfsInstance = (options: IPFS.Options = { repo: `ipfs/repo/${Math.random()}`}): Promise<IPFS> => {
  const ipfs = new IPFS({
    ...remoteConfig,
    ...options,
  });

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
