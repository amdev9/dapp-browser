const fs = require( 'fs' );
const express = require( 'express' );
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
    let pathname = headers.referer.replace(headers.origin + '/', '');
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift();
}

// Routes
router.post('/web', (request, response, next) => {
	let target = getHeaders(request.headers);
	request.body.target = target;

	const events = new EventBus();
	const source = __apps + 'users/' + target + '/manifest.json';
 
	if ( fs.existsSync( source ) ) {
		try {
			events.data = JSON.parse( fs.readFileSync( source ).toString() );
		} catch ( error ) {
			return response.send( 'ERROR!' )
		}
	} else {
		return response.send( 'NOT FOUND!' )
	}

	const permissions = events.data.permissions;
	const rejected = 'No access to system applications: ';

	let access = [];

	access_db.find({target: target}, (error, rows) => {
		if ( !rows.length ) {
			logger.write({payload: {message: rejected + permissions.join( ', ' ), target: target}}, 'ERROR');
			io.emit('access', {message: rejected, rows: permissions});

			return response.send( null );
		}

		let note = rows.shift();

		permissions.forEach(value => {
			if ( note.hasOwnProperty( value ) ) {
				if ( note[value] !== true ) access.push( value )
			} else {
				access.push( value )
			}
		});

		if ( access.length ) {
			logger.write({payload: {message: rejected + access.join( ', ' ), target: target}}, 'ERROR');
			return io.emit('access', {message: rejected, rows: access});

			return response.send( null );
		}

		events.publish(system.WebCtrl, 'web', request.body);
		response.send( request.body )
	});
});

router.post('/access', (request, response, next) => {
	const target = request.body.target;
	const source = __apps + 'users/' + target + '/manifest.json';
 
	if ( fs.existsSync( source ) ) {
		try {
			var object = JSON.parse( fs.readFileSync( source ).toString() );
		} catch ( error ) {
			return response.send( 'ERROR!' )
		}
	} else {
		return response.send( 'NOT FOUND!' )
	}

	const permissions = object.permissions;
	const data = {target: target}

	permissions.forEach(value => data[value] = true);

	access_db.find({target: target}, (error, rows) => {
		!rows.length 
			? access_db.insert( data )
				: access_db.update({target: target}, data);
		
		response.send({status: true})
	});
})

module.exports = router;