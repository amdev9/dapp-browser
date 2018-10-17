import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as path from 'path';

export default class IpfsBaseComponent {
  ipfs: IPFS;
  status: boolean = false;
  readyState: Promise<any>;

  constructor(configuration: IPFS.Options) {
    this.ipfs = new IPFS(configuration);

    IpfsBaseComponent.cleanLocks(configuration.repo || this.ipfs.repo.path())

    this.readyState = new Promise((resolve, reject) => {
      this.ipfs.on('ready', () => {
        if (this.ipfs.isOnline()) {
          console.log('online');
          resolve()
        } else {
          console.log('offline, try to start');
          this.ipfs.start();
        }
      });

      this.ipfs.on('error', (error: Error) => {
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
