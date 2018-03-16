const datetime = require( 'node-datetime' )
const co = require( 'co' )
const fs = require( 'fs' )
const Room = require( 'ipfs-pubsub-room' )
const IPFS = require( 'ipfs' )
const EventBus = require( './event' )
const UseLib = require( './uselib' )

const Events  = new EventBus()
const system  = new UseLib( 'system.id' )
const storage = new UseLib( 'system.map' )
const Rooms = {}

const _handler = Symbol( 'handler' )
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
		this.connect = null
	}

	* create ( response ) {
		const _name_ = response.payload.target // Room Name
		this.connect = response
		
		if ( Rooms[_name_] ) return

		Rooms[_name_] = Room(ipfs, _name_)

		yield this[_subscribe]( Rooms[_name_] )
	}
	
    * broadcast ( response ) {
		const _name_ = response.payload.target // Room Name
		const message = response.payload.message

		if ( !Rooms[_name_] ) {
			this.connect = response
			Rooms[_name_] = Room(ipfs, _name_)

			yield this[_subscribe]( Rooms[_name_] )
		}

		const room = Rooms[_name_]
		room.broadcast(JSON.stringify( message ))
	}

	* [_subscribe] ( room ) {
		const self = this

		room.on('message', message => co(function * () {
			yield self[_handler]( message )
		}))

		room.on('peer joined', peer => {
			console.log('Add Peer: ' + peer)
		})

		room.on('peer left', peer => {
			console.log('Remove Peer: ' + peer)
		})
	}

	* [_handler] ( message ) {
		this.connect.payload.message = message.data.toString()
		yield Events.publish(system.WebCtrl, 'broadcast', this.connect)
	}
}

module.exports = IPFSPubSub