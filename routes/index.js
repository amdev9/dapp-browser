const express = require( 'express' )
const coexp = require( 'co-express' )
const codb  = require( 'co-nedb' )
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

const getHeaders = headers => {
	if ( headers['allow-origin'] ) return headers['allow-origin']

    let pathname = headers.referer.replace(headers.origin + '/', '')
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift()
}

router.post('/', coexp(function * (request, response, next) {
	const userapps = userLoader.items
	const sysapps = systemLoader.items

	const database = codb( db.setting )
	const result = yield database.find({})

	let setting = []
	let market = {}
	let pins = []

	for (let i = 0; i < sysapps.length; i++) {
		if ( sysapps[i].key == system.MrkCtrl ) {
			market = sysapps[i]
			break
		}
	}

	result.forEach(item => {
		if ( item.type == 'pin' ) {
			for (let i = 0; i < userapps.length; i++) {
				if ( item.key == userapps[i].key ) pins.push( userapps[i] )
			}
		}

		if ( item.type == 'setting' ) setting.push( item )
	})

	db.setting = new Datastore({filename: 'database/setting.db', autoload: true})

	response.send({
		pins: pins,
		market: market,
		setting: setting,
		userapps: userapps
	})
}))

router.post('/setting.pin', coexp(function * (request, response, next) {
	let target = getHeaders( request.headers )
	
	if ( target.trim().length ) return response.send({status: false})

	const object = {type: 'pin', key: request.body.key}

	const database = codb( db.setting )
	const result = yield database.find( object )

	let status = true

	yield (!result.length ? database.insert( object ) : database.remove( object ))

	if ( result.length ) status = false

	db.setting = new Datastore({filename: 'database/setting.db', autoload: true})

	response.send({status: status})
}))

router.post('/setting.setting', coexp(function * (request, response, next) {
	let target = getHeaders( request.headers )
	
	if ( target.trim().length ) return response.send({status: false})

	const where = request.body.where || null
	const object = Object.assign({}, request.body.message)

	if ( !where ) return response.send({status: false})

	const database = codb( db.setting )
	const result = yield database.findOne( where )

	if ( result ) Object.assign(result, object)

	yield (result ? database.update(where, result) : database.insert( object ))

	db.setting = new Datastore({filename: 'database/setting.db', autoload: true})

	response.send({status: true})
}))

module.exports = router