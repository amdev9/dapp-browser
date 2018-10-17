import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as path from 'path';

import Ipfs from './IpfsInstance'

export default class IpfsBaseComponent {
  ipfs: IPFS;
  status: boolean = false;
  readyState: Promise<any>;

  constructor(configuration: IPFS.Options) {

    this.readyState = new Promise((resolve, reject) => {
      Ipfs.on('ready', () => {
        if (Ipfs.isOnline()) {
          console.log('online');
          resolve()
        } else {
          console.log('offline, try to start');
          Ipfs.start();
        }
      });

      Ipfs.on('error', (error: Error) => {
        reject(error);
      });
    })

  }

  static cleanLocks (repoPath: string) {
    // This fixes a bug on Windows, where the daemon seems
    // not to be exiting correctly, hence the file is not
    // removed.

    if (!repoPath) {
      return
    }

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

}
