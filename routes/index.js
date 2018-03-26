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
	
	db.setting.find({}, (error, rows) => {
		let setting = []
		let market = {}
		let pins = []

		sysapps.forEach(app => {
			if ( app.key == system.MrkCtrl ) market = app
		})

		for (let i = 0; i < rows.length; i++) {
			if ( rows[i].type == 'pin' ) {
				for (let a = 0; a < userapps.length; a++) {
					if ( rows[i].target == userapps[a].key ) pins.push( userapps[a] )
				}
			}

			if ( rows[i].type == 'setting' ) setting.push( rows[i] )
		}

		response.send({
			pins: pins,
			market: market,
			setting: setting,
			userapps: userapps
		})
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

router.post('/setting.setting', function (request, response, next) {
	const object = request.body

	db.setting.findOne({type: object.type, group: object.group}, (error, string) => {
		string ? db.setting.update(string, object) : db.setting.insert( object )

		response.send({status: true})
	})
})

module.exports = router