import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import { PathList, Path } from './FileManager'
import {IPFSFile, IPFSGetResult} from "../types/ipfs";

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

export type IpfsFileObjectList = Array<IpfsFileObject>

class IpfsComponent {
  ipfs: IPFS;
  status: boolean = false;
  readyState: Promise<any>;
  url: string = 'https://ipfs.array.io/ipfs/';

  constructor(configuration: any) {
    this.ipfs = new IPFS(configuration);

    this.cleanLocks()

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

    this.ipfs.on('start', this.startFunction.bind(this));
  }

  cleanLocks () {
    const repoPath = this.ipfs.repo.path()
    // This fixes a bug on Windows, where the daemon seems
    // not to be exiting correctly, hence the file is not
    // removed.
    console.log('Cleaning repo.lock file')
    const lockPath = pathModule.join(repoPath, 'repo.lock')

    if (fs.existsSync(lockPath)) {
      try {
        fs.unlinkSync(lockPath)
      } catch (err) {
        console.warn('Could not remove repo.lock. Daemon might be running')
      }
    }
  }

  async startFunction() {
    console.log('Node started!');
  }

  async readyFunction() {
    if (this.ipfs.isOnline()) {
      console.log('online');
      this.status = true;
    } else {
      console.log('offline, try to start');
      this.ipfs.start();
    }

    const version = await this.ipfs.version();
    console.log('Version:', version.version);
  };


  async uploadFile(filePath: Path): Promise<IpfsFileObject> {
    if (!filePath){
      return
    }

    // Check online status
    await this.readyState

    console.log('---> IPFS basename', pathModule.basename(filePath))

    const file = { path: pathModule.basename(filePath), content: fs.createReadStream(filePath) }

    const handler = (p: any) => { console.log(p); }
    const options = {
      progress: handler,
      wrapWithDirectory: true,
    }

    const ipfsFiles = await this.ipfs.files.add([file], options)

    console.log('---> IPFS FILE', ipfsFiles)

    // Check paths with source path
    return ipfsFiles[ipfsFiles.length - 1]
  }

  async downloadFile(hash: string): Promise<IPFSGetResult> {
    if (!hash) {
      return
    }

    // Check online status
    await this.readyState

    const files = <IPFSGetResult[]> await this.ipfs.files.get(hash)

    return files[files.length - 1]
  }

}

const remoteConf = {
  start: true,
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Bootstrap: [
      "/ip4/35.204.17.104/tcp/4001/ipfs/QmWCsxqpvYMKCeCejvXLc7TbWrraLwmAKMxWgcsKQ8xUL3"
    ],
    Addresses: {
      Swarm: [
        "/ip4/0.0.0.0/tcp/4001",
        "/ip6/::/tcp/4001",
        "/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/"
      ],
      API: "/ip4/127.0.0.1/tcp/5001",
      Gateway: "/ip4/127.0.0.1/tcp/8080"
    }
  }
};

const localConf = {
  // repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
  config: {
    Addresses: {
      API: "/ip4/127.0.0.1/tcp/5001",
    }
  }
};


export default new IpfsComponent(remoteConf);
