const IPFS = require('ipfs');
const WStar = require('libp2p-webrtc-star');
const wrtc = require('wrtc');
const wstar = new WStar({
  wrtc: wrtc
})

const ipfs = new IPFS({   //);
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
  },
  // libp2p: {
  //   modules: {
  //     transport: [wstar],
  //     discovery: [wstar.discovery]
  //   }
  // }
})

ipfs.on('ready', async () => { 
  console.log(ipfs.isOnline() ? 'online' : 'offline');

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

  ipfs.ls(ipfsPath, function (err, files) {
    files.forEach((file) => {
      console.log(file.path)
    })
  })

});
 