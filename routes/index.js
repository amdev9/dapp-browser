const express = require( 'express' )
const Datastore = require( 'nedb' )
const coexp = require( 'co-express' )
const codb  = require( 'co-nedb' )
const os = require( 'os' )
const UseLib = require( '../components/uselib' )
const UserDappsLoader = require( '../components/user.loader' )
const SystemDappsLoader = require( '../components/system.loader' )

// Router
const router = express.Router()

// System Dapps
const systemLoader = new SystemDappsLoader('manifest.json', 'system')
systemLoader.runInContext()

// User Dapps
const userLoader = new UserDappsLoader('manifest.json', 'users')
userLoader.runInContext()

// Request Index Page
router.post('/', coexp(function * (request, response, next) {
	const database = new Datastore({filename: 'database/setting.db',  autoload: true})
	const setting  = codb( database )

	const system = new UseLib( 'system.id' )
	
	const userapps = userLoader.items
	const sysapps  = systemLoader.items
	const pins = yield setting.find({type: 'pin'})

	let market = {}

	sysapps.forEach(app => {
		if ( app.key == system.MrkCtrl ) market = app
	})
	 
	pins.forEach((pin, index) => {
		userapps.forEach(app => {
			if ( pin.target == app.key ) pins[index] = app
		})
	})

	response.send({pins: pins, market: market, userapps: userapps})
}))

// Request Setting Pin
router.post('/setting.pin', coexp(function * (request, response, next) {
	const database = new Datastore({filename: 'database/setting.db',  autoload: true})
	const setting  = codb( database )

	const object = {type: 'pin', target: request.body.target}

	const pins = yield setting.find( object )

	let status = true

	yield !pins.length ? setting.insert( object ) : setting.remove( object )
	
	if ( pins.length ) status = false

	response.send({status: status})
}))

module.exports = router