import * as fs from 'fs';
import * as IPFS from 'ipfs';

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

    console.log('')

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

      this.ipfs.on('error', () => {
        reject()
      });


    })

    this.ipfs.on('error', this.errorFunction.bind(this, Error));
    this.ipfs.on('start', this.startFunction.bind(this));
  }

  async errorFunction(error: Error) {
    console.error('Something went terribly wrong!', error);
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

  async uploadFilesMethod(pathsList: Array<string>): Promise<IpfsFileObjectList> {
    const files = pathsList.map((path) => ({ path, content: fs.createReadStream(path) }))

    const handler = (p: any) => { console.log(p); };
    const options = {
      progress: handler,
    };

    const result = await this.ipfs.files.add(files, options)
    console.log('-----> rs', result)

    return result
  }

  async uploadFiles(pathsList: Array<string>): Promise<IpfsFileObjectList> {
    return this.readyState.then(() => {
      return this.uploadFilesMethod(pathsList)
    })
  }

  downloadFile(hash: string) {
    console.log(this.url.concat(hash));
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
