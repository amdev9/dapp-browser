const Room = require('ipfs-pubsub-room');
const IPFS = require('ipfs');
const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        "/ip4/0.0.0.0/tcp/4001",
        "/ip6/::/tcp/4001",
        "/dns4/discovery.libp2p.array.io/tcp/9091/wss/p2p-websocket-star/"
      ]
    }
  }
})

// IPFS node is ready, so we can start using ipfs-pubsub-room
ipfs.on('ready', () => {
  const room = Room(ipfs, 'room-name')

  room.on('peer joined', (peer) => {
    console.log('Peer joined the room', peer)
  })

  room.on('peer left', (peer) => {
    console.log('Peer left...', peer)
  })

  // now started to listen to room
  room.on('subscribed', () => {
    console.log('Now connected!')
  })
});