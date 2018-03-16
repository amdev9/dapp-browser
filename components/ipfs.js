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
		this.response = {}
	}

	* create ( response ) {
		const name = response.payload.target // Room Name
		
		if ( Rooms.hasOwnProperty( name ) ) return

		Rooms[name] = Room(ipfs, name)

		const room = Rooms[name]
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
	
    * broadcast ( response ) {
		const name = response.payload.target // Room Name
		const message = response.payload.message
		this.response = response

		const room = Rooms[name]
		room.broadcast(JSON.stringify( message ))
	}

	* [_handler] ( message ) {
		this.response.payload.message = message.data.toString()
		yield Events.publish(system.WebCtrl, 'broadcast', this.response)
	}
}

module.exports = IPFSPubSub