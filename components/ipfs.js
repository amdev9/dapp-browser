const datetime = require( 'node-datetime' )
const Room = require( 'ipfs-pubsub-room' )
const username = require( 'username' )
const EventBus = require( './event' )
const UseLib = require( './uselib' )
const IPFS = require( 'ipfs' )
const co = require( 'co' )
const fs = require( 'fs' )

const Events  = new EventBus()
const system  = new UseLib( 'system.id' )
const storage = new UseLib( 'system.map' )
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
				'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
			]
		}
	}
})

class IPFSPubSub {
	constructor () {
		this.data = null
	}

	* create ( response ) {
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		this.data = response
		this.data.payload.message.room = _name_
		
		if ( Rooms[_name_] ) return this.data.payload.message.error = true

		Rooms[_name_] = Room(ipfs, _name_)

		yield this[_subscribe]( Rooms[_name_] )
	}

	* connect ( response ) {
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		this.data = response
		this.data.payload.message.room = _name_

		// if ( !Rooms[_name_] ) return this.data.payload.message.error = true

		Rooms[_name_] = Room(ipfs, _name_)

		yield this[_subscribe]( Rooms[_name_] )
	}
	
    * broadcast ( response ) {
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		const message = response.payload.message

		if ( !Rooms[_name_] ) return message.error = true

		message.room = _name_
        message.datetime = datetime.create().format( 'd-m-Y H:M:S' )
		message.username = username.sync()

		const room = Rooms[_name_]
		room.broadcast(JSON.stringify( message ))
	}

	* [_subscribe] ( room ) {
		const self = this

		room.on('message', message => co(function * () {
			yield self[_handler]( message )
		}))

		room.on('peer joined', peer => co(function * () {
			yield self[_joined]( room.getPeers() )
		}))

		room.on('peer left', peer => co(function * () {
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
		console.log( this.data.payload.message )
		this.data.payload.message.peers = peers
		yield Events.publish(system.WebCtrl, 'detached', this.data)
	}
}

module.exports = IPFSPubSub