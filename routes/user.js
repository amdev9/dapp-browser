const express = require( 'express' )
const coexp = require( 'co-express' )
const codb  = require( 'co-nedb' )
const Datastore = require( 'nedb' )
const uniqid = require( 'uniqid' )
const fs = require( 'fs' )

const UseLib = require( '../components/uselib' )
const EventBus = require( '../components/event' )

const router = express.Router()

const system = new UseLib( 'system.id' )
const mapping = new UseLib( 'system.map' )

const getHeaders = headers => {
	if ( headers['allow-origin'] ) return headers['allow-origin']

    let pathname = headers.referer.replace(headers.origin + '/', '')
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift()
}

router.post('/web', coexp(function * (request, response, next) {
	let target = getHeaders(request.headers)
	request.body.target = target
	request.body.unic = uniqid()

	mapping[request.body.unic] = ( body ) => response.send( body )
	yield new EventBus().publish(target, request.body.message_type, request.body)
}))


// const readDataFile = ( source ) => {
// 	if ( fs.existsSync( source ) ) {
// 		try {
// 			return JSON.parse( fs.readFileSync( source ).toString() )
// 		} catch ( error ) {
// 			throw error
// 		}
// 	} else {
// 		throw new Error( 'NOT FOUND!' )
// 	}
// }

// router.post('/access', function (request, response, next) {
// 	const target = request.body.target

// 	let __dir = 'users/'

// 	for (const key in system) {
// 		if ( system[key] == target ) {
// 			__dir = 'system/'
// 			break
// 		}
// 	}

// 	const source = __apps + __dir + target + '/manifest.json'
// 	const object = readDataFile( source )

// 	const permissions = object.permissions
// 	const data = {target: target}

// 	permissions.forEach(value => data[value] = true)

// 	db.access.find({target: target}, () => {
// 		!rows.length ? db.access.insert( data ) : db.access.update({target: target}, data)
		
// 		response.send({status: true})
// 	})
// })

// const permissions = events.data.permissions
// const rejected = 'No access to system applications: '

// const items = []

// db.access.find({target: target}, (error, rows) => {
// 	if ( !rows.length && permissions.length ) {
// 		logger.write({payload: {message: rejected + permissions.join( ', ' ), target: target}}, 'ERROR')
// 		return io.emit('access', {message: rejected, rows: permissions})
// 	}

// 	const note = rows.shift()

// 	permissions.forEach(value => {
// 		if ( note.hasOwnProperty( value ) ) {
// 			if ( note[value] !== true ) items.push( value )
// 		} else {
// 			items.push( value )
// 		}
// 	})

// 	if ( items.length ) {
// 		logger.write({payload: {message: rejected + access.join( ', ' ), target: target}}, 'ERROR')
// 		return io.emit('access', {message: rejected, rows: items})
// 	}

// 	console.log('async')
// })

module.exports = router