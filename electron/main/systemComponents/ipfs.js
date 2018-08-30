const fs = require('fs');
const IPFS = require('ipfs');
const libp2p = require('libp2p');
const WStar = require('libp2p-webrtc-star');
const wrtc = require('wrtc');
const wstar = new WStar({
  wrtc: wrtc
})

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
  repo: '/Users/pidgin/dev/boilerplate/ipfsTest',
  config: {
    Addresses: {
      API: "/ip4/127.0.0.1/tcp/5001",
    }
  }
};

const ipfs = new IPFS(localConf)




ipfs.on('ready', async () => { 
  if (ipfs.isOnline()) {
    console.log('online');
  } else {
    console.log('offline, try to start');
    ipfs.start();
  }

  const version = await ipfs.version()

  console.log('Version:', version.version)
  
  const filesAdded = await ipfs.files.add({
    path: 'hello.txt',
    content: Buffer.from('This is the contents of file')
  })
  
  console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);

  let ipfsPath = filesAdded[0].hash;
  ipfs.files.cat(ipfsPath, function (err, file) {
    if (err) {
      throw err
    }
    console.log(file.toString('utf8'))
  });


  const stream = ipfs.files.addReadableStream();
  stream.on('data', function (file) {

    ipfs.files.cat(file.hash, function (err, fileContent) {
      if (err) {
        throw err
      }
      console.log(file, fileContent.toString('utf8'))
    });

    // 'file' will be of the form
    // {
    //   path: '/tmp/myfile.txt',
    //   hash: 'QmHash' // base58 encoded multihash
    //   size: 123
    // }
  })

  fs.readFile('package.json', (err, data) => {
    if (err) throw err;
    console.log(data);
    stream.write({
      path: '/testFile.txt',
      content: data
    })
    stream.end();
   
  });





});
 

ipfs.on('error', error => {
  console.error('Something went terribly wrong!', error)
})

ipfs.on('start', () => console.log('Node started!'))
