const datetime = require( 'node-datetime' )
const Room = require( 'ipfs-pubsub-room' )
const username = require( 'username' )
const Frontend = require( './frontend' )
const EventBus = require( './event' )
const UseLib = require( './uselib' )
const IPFS = require( 'ipfs' )
const co = require( 'co' )
const fs = require( 'fs' )

const Events  = new EventBus()
const FrontEnd = new Frontend()
const system  = new UseLib( 'system.id' )
const mapping = new UseLib( 'system.map' )
const Rooms = {}

const _handler = Symbol( 'handler' )
const _joined = Symbol( 'joined' )
const _detached = Symbol( 'detached' )
const _subscribe = Symbol( 'subscribe' )

const ipfs = new IPFS({
	EXPERIMENTAL: {
		pubsub: true
	},
	config: {
		Addresses: {
			Swarm: [
				// '/ip4/80.209.231.155/tcp/8081/ws'
				// '/ip4/35.204.17.104/tcp/8081/ws'
				// '/ip4/35.204.17.104/tcp/9090/ws'
				// '/ip4/35.204.17.104/tcp/9090/ws/p2p-websocket-star'
				'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
				// 'https://ipfs.array.io/ipfs/'
			]
		}
	}
})

// ipfs.on('ready', () => { console.log( 'ready' ) })
// ipfs.on('error', () => { console.log( 'error' ) })
// ipfs.on('init',  () => { console.log( 'init' ) })
// ipfs.on('start', () => { console.log( 'start' ) })
// ipfs.on('stop',  () => { console.log( 'stop' ) }) 

class IPFSPubSub {
	constructor () {
		this.data = null
		this.node = ipfs
	}

	* create ( response ) {
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		this.data = response
		this.data.payload.message.room = _name_
		
		if ( Rooms[_name_] || !_room_.length ) {
			this.data.payload.message.error = true
			return FrontEnd.complete( this.data.payload )
		}

		Rooms[_name_] = Room(this.node, _name_)

		yield this[_subscribe]( Rooms[_name_] )

		FrontEnd.complete( this.data.payload )
	}

	* connect ( response ) {
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		this.data = response
		this.data.payload.message.room = _name_

		if ( !_room_.length ) this.data.payload.message.error = true
		
		if ( !Rooms[_name_] && _room_.length ) {
			
			Rooms[_name_] = Room(this.node, _name_)

			yield this[_subscribe]( Rooms[_name_] )

			return FrontEnd.complete( this.data.payload )
		}

		FrontEnd.complete( this.data.payload )
	}
	
    * broadcast ( response ) {
		const _room_  = response.payload.message.room
		const _name_  = _room_ + response.payload.target // Room Name
		const message = response.payload.message

		if ( !Rooms[_name_] ) {
			message.error = true
			return FrontEnd.complete( response.payload )  
		}

		message.room = _name_
        message.datetime = datetime.create().format( 'd-m-Y H:M:S' )
		message.username = username.sync()

		const room = Rooms[_name_]
		room.broadcast(JSON.stringify( message ))

		FrontEnd.complete( response.payload )  
	}

	* [_subscribe] ( room ) {
		const self = this

		room.on('message', message => co(function * () {
			console.log( 'message', message )
			yield self[_handler]( message )
		}))

		room.on('peer joined', peer => co(function * () {
			console.log('joined', peer )
			yield self[_joined]( room.getPeers() )
		}))

		room.on('peer left', peer => co(function * () {
			console.log( 'left', peer )
			yield self[_detached]( room.getPeers() )
		}))
	}

	* [_handler] ( message ) {
		this.data.payload.message = message.data.toString()
		yield Events.publish(system.WebCtrl, 'broadcast', this.data)
	}

	* [_joined] ( peers ) {
		this.data.payload.message.peers = peers
		yield Events.publish(system.WebCtrl, 'joined', this.data)
	}

	* [_detached] ( peers ) {
		this.data.payload.message.peers = peers
		yield Events.publish(system.WebCtrl, 'detached', this.data)
	}
}

module.exports = IPFSPubSub