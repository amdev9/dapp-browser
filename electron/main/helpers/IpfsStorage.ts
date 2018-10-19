import * as fs from 'fs';
import * as IPFS from 'ipfs';
import * as pathModule from 'path';

import { Path } from './FileManager'
import { IPFSGetResult} from "../types/ipfs";

export interface IpfsFileObject {
  hash: string;
  path: string;
  size: number;
}

export type IpfsFileObjectList = Array<IpfsFileObject>

const EXEC_TIMEOUT = 10000

const functionPromiseTimeout = (f: () => Promise<any>, timeout: number) => {
  if (!(f instanceof Function)){
    throw Error('First argument is not a function')
  }

  const result = f()

  if (!(result instanceof Promise)){
    return result
  }

  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject('Timeout error')
    }, timeout)

    result
      .then((data) => resolve(data))
      .catch((error) => reject(error))
      .finally(() => clearTimeout(timerId))
  })
}

class IpfsComponent {
  ipfs: IPFS;
  status: boolean = false;
  readyState: Promise<any>;
  url: string = 'https://ipfs.array.io/ipfs/';

  constructor(configuration: IPFS.Options) {
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


  async uploadFile(filePath: Path): Promise<IpfsFileObject | null> {
    if (!filePath){
      return
    }

    // Check online status
    await this.readyState

    const file = { path: pathModule.basename(filePath), content: fs.createReadStream(filePath) }

    const handler = (p: any) => { console.log(p); }
    const options = {
      progress: handler,
      wrapWithDirectory: true,
    }

    const ipfsFiles = await this.ipfs.files.add([file], options)

    if (!ipfsFiles || !ipfsFiles.length){
      return null
    }

    return ipfsFiles[ipfsFiles.length - 1]
  }

  async downloadFile(hash: string): Promise<IPFSGetResult | null> {
    if (!hash) {
      return
    }

    // Check online status
    await this.readyState

    const files: any = await functionPromiseTimeout(() => {
      return this.ipfs.files.get(hash)
    }, EXEC_TIMEOUT)

    if (!files || !files.length){
      throw Error('File with current hash does not exist')
    }

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
