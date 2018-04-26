const datetime = require( 'node-datetime' )
const Room = require( 'ipfs-pubsub-room' )
const username = require( 'username' )
const Frontend = require( './frontend' )
const EventBus = require( './event' )
const UseLib = require( './uselib' )
// const IPFS = require( 'ipfs' )
const IPAPI = require( 'ipfs-api' )
const co = require( 'co' )
const fs = require( 'fs' )

const Events  = new EventBus()
const FrontEnd = new Frontend()
const system  = new UseLib( 'system.id' )
const mapping = new UseLib( 'system.map' )
const Rooms = []

// var ready = true

// const ipfs = new IPFS({
// 	config: {
// 		Addresses: {
// 			Swarm: [
// 				// '/ip4/80.209.231.155/tcp/8081/ws'
// 				// '/ip4/35.204.17.104/tcp/8081/ws'
// 				'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
// 			]
// 		}
// 	}
// })

// ipfs.on('error', ( error ) => {
// 	// close app
// })

// /ip4/80.209.231.155/tcp/8081/ws

var ipapi = IPAPI( '/ip4/35.204.17.104/tcp/5001' )

class IPFSPubSub {
	constructor () {
		this.data = null
	}

	* create ( response ) {
		const _self_ = this
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		this.data = response
		this.data.payload.message.room = _name_

		if ( Rooms.includes( _name_ ) ) {
			return FrontEnd.complete( this.data.payload )
		}

		ipapi.pubsub.subscribe(_name_, message => { co(function * () {
			_self_.data.payload.message = message.data.toString()
			yield Events.publish(system.WebCtrl, 'broadcast', _self_.data)
		})})

		ipapi.pubsub.peers(_name_, (error, peers) => { co(function * () {
			_self_.data.payload.message.peers = peers
			yield Events.publish(system.WebCtrl, 'joined', _self_.data)
		})})

		Rooms.push( _name_ )

		FrontEnd.complete( this.data.payload )
	}

	* connect ( response ) {
		const _self_ = this
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name

		this.data = response
		this.data.payload.message.room = _name_

		if ( Rooms.includes( _name_ ) ) {
			return FrontEnd.complete( this.data.payload )
		}

		ipapi.pubsub.subscribe(_name_, message => { co(function * () {
			_self_.data.payload.message = message.data.toString()
			yield Events.publish(system.WebCtrl, 'broadcast', _self_.data)
		})})

		ipapi.pubsub.peers(_name_, (error, peers) => { co(function * () {
			_self_.data.payload.message.peers = peers
			yield Events.publish(system.WebCtrl, 'joined', _self_.data)
		})})

		Rooms.push( _name_ )

		FrontEnd.complete( this.data.payload )
	}
	
    * broadcast ( response ) {
		const _self_ = this
		const _room_ = response.payload.message.room
		const _name_ = _room_ + response.payload.target // Room Name
		
		const message = response.payload.message
		
		message.room = _name_
		message.datetime = datetime.create().format( 'd-m-Y H:M:S' )
		message.username = username.sync()

		ipapi.pubsub.publish(_name_, new Buffer( JSON.stringify( message ) ))

		FrontEnd.complete( response.payload )  
	}

	// * [_subscribe] ( room ) {
	// 	const self = this

	// 	room.on('message', message => co(function * () {
	// 		yield self[_handler]( message )
	// 	}))

	// 	room.on('peer joined', peer => co(function * () {
	// 		yield self[_joined]( room.getPeers() )
	// 	}))

	// 	room.on('peer left', peer => co(function * () {
	// 		yield self[_detached]( room.getPeers() )
	// 	}))
	// }

	// * [_handler] ( message ) {
	// 	this.data.payload.message = message.data.toString()
	// 	yield Events.publish(system.WebCtrl, 'broadcast', this.data)
	// }

	// * [_joined] ( peers ) {
	// 	this.data.payload.message.peers = peers
	// 	yield Events.publish(system.WebCtrl, 'joined', this.data)
	// }

	// * [_detached] ( peers ) {
	// 	this.data.payload.message.peers = peers
	// 	yield Events.publish(system.WebCtrl, 'detached', this.data)
	// }
}

module.exports = IPFSPubSub