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
  
  const stream = ipfs.files.addReadableStream();
  stream.on('data', function (file) {
    console.log(file)
    // ipfs.files.cat(file.hash, function (err, fileContent) {
    //   if (err) {
    //     throw err
    //   }
    //   console.log(file, fileContent.toString('utf8'))
    // });
  })


  var rstream = fs.createReadStream('/Users/pidgin/Downloads/windows.iso'); //
  var dataLength = 0;
  // using a readStream that we created already
  rstream
    .on('data', function (chunk) {
      dataLength += chunk.length;
      console.log('write chunk :', dataLength);
      stream.write({
        path: '/testFile.txt',
        content: chunk
      })
    })
    .on('end', function () {  // done
      console.log('The length was:', dataLength);
      stream.end();
    });

 
  // fs.readFile('package.json', (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  //   stream.write({
  //     path: 'foo',
  //     content: data
  //   })
  //   stream.end();
  // });
});
 
ipfs.on('error', error => {
  console.error('Something went terribly wrong!', error)
})

ipfs.on('start', () => console.log('Node started!'))
