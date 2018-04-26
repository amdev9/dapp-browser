const datetime = require( 'node-datetime' )
const username = require( 'username' )
const Frontend = require( './frontend' )
const EventBus = require( './event' )
const UseLib = require( './uselib' )
const IPFS = require( 'ipfs-api' )
const co = require( 'co' )
const fs = require( 'fs' )

const Events  = new EventBus()
const FrontEnd = new Frontend()
const system  = new UseLib( 'system.id' )
const mapping = new UseLib( 'system.map' )
const Rooms = []

// // var ipfs = IPFS( '/ip4/35.204.17.104/tcp/5001' )
var ipfs = IPFS({host: '35.204.17.104', port: '5001', protocol: 'http'})

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

		ipfs.pubsub.subscribe(_name_, message => { co(function * () {
			_self_.data.payload.message = message.data.toString()
			yield Events.publish(system.WebCtrl, 'broadcast', _self_.data)
		})})

		ipfs.pubsub.peers(_name_, (error, peers) => { co(function * () {
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

		ipfs.pubsub.subscribe(_name_, message => { co(function * () {
			_self_.data.payload.message = message.data.toString()
			yield Events.publish(system.WebCtrl, 'broadcast', _self_.data)
		})})

		ipfs.pubsub.peers(_name_, (error, peers) => { co(function * () {
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

		ipfs.pubsub.publish(_name_, new Buffer( JSON.stringify( message ) ))

		FrontEnd.complete( response.payload )  
	}
}

module.exports = IPFSPubSub