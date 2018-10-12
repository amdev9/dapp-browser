import * as fs from 'fs';
import * as IPFS from 'ipfs';


class IpfsComponent {
  ipfs: IPFS;
  status: boolean = false;
  url: string = 'https://ipfs.array.io/ipfs/';

  constructor(configuration: any) {
    this.ipfs = new IPFS(configuration);
    
    this.ipfs.on('ready', this.readyFunction.bind(this)); 
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
    this.uploadFile('uploadFile.ts');
  };
  
  uploadFile(fileName: string) {
    var rstream = fs.createReadStream(fileName); 
    const files = [
      {
        path: '/upload.ts',
        content: rstream
      }
    ];
    const handler = (p: any) => { console.log(p); };
    const options = { 
      progress: handler
    };
    this.ipfs.files.add(files, options, function (err, files) {
      if(err) { console.log(err); }
      console.log(files);
    })
  }

  downloadFile(hash: string) {
    console.log(this.url.concat(hash));
  }
}

const remoteConf = { 
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

  
let ipfs = new IpfsComponent(localConf);
console.log(ipfs.status);
