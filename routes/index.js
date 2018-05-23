const express = require( 'express' )
const UseLib = require( '../components/uselib' )
const UserDappsLoader = require( '../components/user.loader' )
const SystemDappsLoader = require( '../components/system.loader' )

const router = express.Router()
const system = new UseLib( 'system.id' )

const systems = new SystemDappsLoader()
systems.onStart()

const users = new UserDappsLoader()
users.onStart()

const getHeaders = headers => {
	if ( headers['allow-origin'] ) return headers['allow-origin']

    let pathname = headers.referer.replace(headers.origin + '/', '')
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift().trim()
}

router.post('/', async function (request, response, next) {
	const result = await new Promise(resolve => {
		db.setting.find({}, (error, rows) => resolve( rows ))
	})

	let setting = []
	let pins = []

	result.forEach(item => {
		if ( item.type == 'pin' ) {
			for (let i = 0; i < users.items.length; i++) {
				if ( item.hash == users.items[i].hash ) pins.push( users.items[i] )
			}
		}

		if ( item.type == 'setting' ) setting.push( item )
	})

	response.send({
		pins: pins,
		system: system,
		setting: setting,
		userapps: users.items
	})
})

router.post('/setting.pin', async function (request, response, next) {
	const target = getHeaders( request.headers )
	
	if ( target.length ) return response.send({status: false})

	const object = {type: 'pin', hash: request.body.hash}

	const status = await new Promise(resolve => {
		db.setting.find(object, (error, rows) => {
			if ( !rows.length ) return db.setting.insert(object, () => resolve( true ))
			db.setting.remove(object, () => resolve( false ))
		})
	})

	response.send({status: status})
})

router.post('/setting.setting', async function (request, response, next) {
	let target = getHeaders( request.headers )
	
	if ( target.length ) return response.send({status: false})

	const where = request.body.where || null
	const object = Object.assign({}, request.body.message)

	if ( !where ) return response.send({status: false})

	await new Promise(resolve => {
		db.setting.findOne(where, (error, result) => {
			if ( !result ) return db.setting.insert(object, resolve)
				
			const clone = Object.assign(result, object)

			if ( Object.keys( clone ).length ) db.setting.update(where, clone, {}, resolve)
		})
	})

	response.send({status: true})
})

module.exports = router