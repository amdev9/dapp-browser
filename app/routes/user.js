const fs = require( 'fs' );
const express = require( 'express' );
const Datastore = require( 'nedb' );
const coexp = require( 'co-express' );
const codb  = require( 'co-nedb' );
const Logger = require( '../components/logger' );
const UseLib = require( '../components/uselib' );
const EventBus = require( '../components/event' );

// Router
const router = express.Router();

// Lib System IDS
const system = new UseLib( 'system.id' )

// Logger
const logger = new Logger();

// Headers
const getHeaders = headers => {
	if ( headers['allow-origin'] ) return headers['allow-origin'];

    let pathname = headers.referer.replace(headers.origin + '/', '');
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift();
}

const readDataFile = ( source ) => {
	if ( fs.existsSync( source ) ) {
		try {
			return JSON.parse( fs.readFileSync( source ).toString() );
		} catch ( error ) {
			throw error;
		}
	} else {
		throw new Error( 'NOT FOUND!' );
	}
}

// Request Web Controller
router.post('/web', coexp(function * (request, response, next) {
	const database = new Datastore({filename: 'database/access.db',  autoload: true});
	const access   = codb( database );

	let target = getHeaders(request.headers);
	request.body.target = target;

	let __dir = 'users/';

	for (const key in system) {
		if ( system[key] == target ) {
			__dir = 'system/'
			break
		}
	}

	const events = new EventBus();
	const source = __apps + __dir + target + '/manifest.json';

	events.data = readDataFile( source );

	const permissions = events.data.permissions;
	const rejected = 'No access to system applications: ';

	const items = [];

	const rows = yield access.find({target: target});

	if ( !rows.length && permissions.length ) {
		yield logger.write({payload: {message: rejected + permissions.join( ', ' ), target: target}}, 'ERROR');
		io.emit('access', {message: rejected, rows: permissions});

		return response.send( null );
	}

	const note = rows.shift();

	permissions.forEach(value => {
		if ( note.hasOwnProperty( value ) ) {
			if ( note[value] !== true ) items.push( value )
		} else {
			items.push( value )
		}
	});

	if ( items.length ) {
		yield logger.write({payload: {message: rejected + access.join( ', ' ), target: target}}, 'ERROR');
		io.emit('access', {message: rejected, rows: items});

		return response.send( null );
	}

	yield events.publish(system.WebCtrl, 'web', request.body);

	response.send( request.body );
}));

// Request Access Permissions
router.post('/access', coexp(function * (request, response, next) {
	const database = new Datastore({filename: 'database/access.db',  autoload: true});
	const access   = codb( database );

	const target = request.body.target;

	let __dir = 'users/';

	for (const key in system) {
		if ( system[key] == target ) {
			__dir = 'system/'
			break
		}
	}

	const source = __apps + __dir + target + '/manifest.json';
	const object = readDataFile( source );

	const permissions = object.permissions;
	const data = {target: target}

	permissions.forEach(value => data[value] = true);

	const rows = yield access.find({target: target});

	yield !rows.length ? access.insert( data ) : access.update({target: target}, data);
		
	response.send({status: true})
}))

module.exports = router;