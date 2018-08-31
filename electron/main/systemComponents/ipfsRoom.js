const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        "/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/"
      ]
    }
  }
});

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }
  console.log('IPFS node ready with address ' + info.id);

  const room = Room(ipfs, 'ipfs-pubsub-demo');

  room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'));
  room.on('peer left', (peer) => console.log('peer ' + peer + ' left'));

  // send and receive messages

  room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'));
  room.on('message', (message) => console.log('got message from ' + message.from + ': ' + message.data.toString()));

  // broadcast message every 2 seconds

  setInterval(() => room.broadcast('hey everyone!'), 2000);
}));

function repo () {
  return 'ipfs/pubsub-demo/' + Math.random()
}


// const Room = require('ipfs-pubsub-room');
// const IPFS = require('ipfs');
// const ipfs = new IPFS({
//   EXPERIMENTAL: {
//     pubsub: true
//   },
//   config: {
//     Addresses: {
//       Swarm: [
//         "/ip4/0.0.0.0/tcp/4001",
//         "/ip6/::/tcp/4001",
//         "/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/"
//       ]
//     }
//   }
// })

// // IPFS node is ready, so we can start using ipfs-pubsub-room
// ipfs.on('ready', () => {
//   const room = Room(ipfs, 'room-name')

//   room.on('peer joined', (peer) => {
//     console.log('Peer joined the room', peer)
//   })

//   room.on('peer left', (peer) => {
//     console.log('Peer left...', peer)
//   })

//   // now started to listen to room
//   room.on('subscribed', () => {
//     console.log('Now connected!')
//   })
// });