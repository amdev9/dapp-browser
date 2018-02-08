const express = require( 'express' );
const UserDappsLoader = require( '../components/user.loader' );
const SystemDappsLoader = require( '../components/system.loader' );

// Router
const router = express.Router();

// User Dapps
const userLoader = new UserDappsLoader('manifest.json', 'users');
userLoader.runInContext();

// System Dapps
const systemLoader = new SystemDappsLoader('manifest.json', 'system');
systemLoader.runInContext();

// Routes
router.get('/', (request, response, next) => {
	response.render('layouts/index', {
		title: 'Express',
		items: userLoader.items
	});
});

module.exports = router;