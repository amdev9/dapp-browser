const express = require( 'express' )
const Datastore = require( 'nedb' )

const UseLib = require( '../components/uselib' )
const UserDappsLoader = require( '../components/user.loader' )
const SystemDappsLoader = require( '../components/system.loader' )

const router = express.Router()
const system = new UseLib( 'system.id' )

const systemLoader = new SystemDappsLoader('manifest.json', 'system')
systemLoader.runInContext()

const userLoader = new UserDappsLoader('manifest.json', 'users')
userLoader.runInContext()

router.post('/', function (request, response, next) {
	const userapps = userLoader.items
	const sysapps  = systemLoader.items
	
	db.setting.find({type: 'pin'}, (error, rows) => {
		let market = {}

		sysapps.forEach(app => {
			if ( app.key == system.MrkCtrl ) market = app
		})
		
		rows.forEach((pin, index) => {
			userapps.forEach(app => {
				if ( pin.target == app.key ) rows[index] = app
			})
		})

		response.send({pins: rows, market: market, userapps: userapps})
	})
})

router.post('/setting.pin', function (request, response, next) {
	const object = {type: 'pin', target: request.body.target}

	db.setting.find(object, (error, rows) => {
		let status = true

		!rows.length ? db.setting.insert( object ) : db.setting.remove( object )
		
		if ( rows.length ) status = false
	
		response.send({status: status})
	})
})

module.exports = router