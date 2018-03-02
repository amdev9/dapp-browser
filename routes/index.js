const express = require( 'express' );
const UseLib = require( '../components/uselib' );
const UserDappsLoader = require( '../components/user.loader' );
const SystemDappsLoader = require( '../components/system.loader' );

// Router
const router = express.Router();

// System Dapps
const systemLoader = new SystemDappsLoader('manifest.json', 'system');
systemLoader.runInContext();

// User Dapps
const userLoader = new UserDappsLoader('manifest.json', 'users');
userLoader.runInContext();

// Request Index Page
router.get('/', (request, response, next) => {
	const system = new UseLib( 'system.id' );

	db.setting.find({type: 'pin'}, (error, rows) => {
		const userapps = userLoader.items;
		const sysapps  = systemLoader.items;
		
		let market = {}

		sysapps.forEach(app => {
			if ( app.key == system.MrkCtrl ) market = app
		})

		rows.forEach((pin, index) => {
			userapps.forEach(app => {
				if ( pin.target == app.key ) rows[index] = app
			})
		});
		
		response.render('layouts/index', {
			title: 'Express',
			pins : rows,
			market: market,
			userapps: userapps
		});
	});
});

// Request Setting Pin
router.post('/setting.pin', (request, response, next) => {
	const object = {type: 'pin', target: request.body.target}

	db.setting.find(object, (error, rows) => {
		let status = true;

		!rows.length ? db.setting.insert( object ) : db.setting.remove( object );
		if ( rows.length ) status = false;

		response.send({status: status})
	});
});

module.exports = router;