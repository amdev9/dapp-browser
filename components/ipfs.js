const datetime = require( 'node-datetime' )
const fs = require( 'fs' )
const Room = require( 'ipfs-pubsub-room' )
const IPFS = require( 'ipfs' )
const EventBus = require( './event' )

const Events = new EventBus()
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
	* create (from, message) {
		if ( Rooms.hasOwnProperty( from ) ) return

		Rooms[from] = {object: Room(ipfs, from), peers: []}

		const room = Rooms[from]

		room.object.on('message', message => {
			this[_handler](room, message)
		})

		room.object.on('peer joined', peer => {
			if ( room.peers.indexOf( peer ) == -1 ) room.peers.push( peer )
			console.log('add peer')
		})

		room.object.on('peer left', peer => {
			room.peers.splice(room.peers.indexOf( peer ), 1)
			console.log('remove peer')
		})
	}
	
    * broadcast (from, message) {
		const room = Rooms[from]
		room.object.broadcast(JSON.stringify( message ))
	}

	* sendTo (from, message) {
		const room = Rooms[from]
		room.object.sendTo(peer, message)
	}

	[_handler] (object, message) {
		let data = message.data.toString()
		console.log( data )
	}
}

module.exports = IPFSPubSub