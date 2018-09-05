import * as fs from 'fs';
import * as IPFS from 'ipfs';


class IpfsComponent {
  constructor(configuration: any) {

  }
  uploadFile() {}
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

const ipfs = new IPFS(localConf);

ipfs.on('ready', async () => { 
  if (ipfs.isOnline()) {
    console.log('online');
  } else {
    console.log('offline, try to start');
    ipfs.start();
  }

  const version = await ipfs.version();

  console.log('Version:', version.version);
  
  var rstream = fs.createReadStream('uploadFile.ts'); 
  const files = [
    {
      path: '/upload.ts',
      content: rstream
    }
  ];
  const handler = (p) => { console.log(p); };
  const options = { 
    progress: handler
  };
  ipfs.files.add(files, options, function (err, files) {
    if(err) { console.log(err); }
    console.log(files);
  })
});
 
ipfs.on('error', error => {
  console.error('Something went terribly wrong!', error)
});

ipfs.on('start', () => console.log('Node started!'));
