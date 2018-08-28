const fs = require('fs');
const IPFS = require('ipfs');
const WStar = require('libp2p-webrtc-star');
const wrtc = require('wrtc');
const wstar = new WStar({
  wrtc: wrtc
})

const node = new IPFS({   //);
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

node.on('ready', async () => {
  if(node.isOnline()) {
    console.log('online');
  } else {
    console.log('offline');
  }

  const version = await node.version()

  console.log('Version:', version.version)
  
  const filesAdded = await node.files.add({
    path: 'hello.txt',
    content: Buffer.from('Hello World 101')
  })
  
  console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
});

/*

const fs = require('fs');
const IPFS = require('ipfs');
const datetime = require('node-datetime')
const Room = require('ipfs-pubsub-room')
const username = require('username')
const Frontend = require('./frontend')
const EventBus = require('./event')
const UseLib = require('./uselib')


const WStar = require('libp2p-webrtc-star')
const wrtc = require('wrtc')
const wstar = new WStar({
  wrtc: wrtc
})

const Events = new EventBus()
const FrontEnd = new Frontend()
const system = new UseLib('system.id')
const mapping = new UseLib('system.map')
const Rooms = {}

const ipfs = new IPFS({
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
  libp2p: {
    modules: {
      transport: [wstar],
      discovery: [wstar.discovery]
    }
  }
})

// ipfs.on('ready', () => { console.log( 'ready' ) })
// ipfs.on('error', () => { console.log( 'error' ) })
// ipfs.on('init',  () => { console.log( 'init' ) })
// ipfs.on('start', () => { console.log( 'start' ) })
// ipfs.on('stop',  () => { console.log( 'stop' ) })

class IPFSPubSub {
  constructor() {
    this.data = null
    this.node = ipfs
  }

  async create(response) {
    const _room_ = response.payload.message.room
    const _name_ = _room_ + response.payload.target // Room Name

    this.data = response
    this.data.payload.message.room = _name_

    if (Rooms[_name_] || !_room_.length) {
      this.data.payload.message.error = true
      return FrontEnd.complete(this.data.payload)
    }

    Rooms[_name_] = Room(this.node, _name_)

    this.subscribe(Rooms[_name_])

    FrontEnd.complete(this.data.payload)
  }

  async connect(response) {
    const _room_ = response.payload.message.room
    const _name_ = _room_ + response.payload.target // Room Name

    this.data = response
    this.data.payload.message.room = _name_

    if (!_room_.length) this.data.payload.message.error = true

    if (!Rooms[_name_] && _room_.length) {

      Rooms[_name_] = Room(this.node, _name_)

      this.subscribe(Rooms[_name_])

      return FrontEnd.complete(this.data.payload)
    }

    FrontEnd.complete(this.data.payload)
  }

  async broadcast(response) {
    const _room_ = response.payload.message.room
    const _name_ = _room_ + response.payload.target // Room Name
    const message = response.payload.message

    if (!Rooms[_name_]) {
      message.error = true
      return FrontEnd.complete(response.payload)
    }

    message.room = _name_
    message.datetime = datetime.create().format('d-m-Y H:M:S')
    message.username = username.sync()

    const room = Rooms[_name_]
    room.broadcast(JSON.stringify(message))

    FrontEnd.complete(response.payload)
  }

  async subscribe(room) {
    room.on('message', message => this.handler(message))
    room.on('peer joined', peer => this.joined(room.getPeers()))
    room.on('peer left', peer => this.detached(room.getPeers()))
  }

  async handler(message) {
    this.data.payload.message = message.data.toString()
    Events.publish(system.WebCtrl, 'broadcast', this.data)
  }

  async joined(peers) {
    this.data.payload.message.peers = peers
    Events.publish(system.WebCtrl, 'joined', this.data)
  }

  async detached(peers) {
    this.data.payload.message.peers = peers
    Events.publish(system.WebCtrl, 'detached', this.data)
  }
}

module.exports = IPFSPubSub
*/