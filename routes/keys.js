const express = require( 'express' );
const route = express.Router();
const Keychain = require('../components/keychain');
const bodyParser = require('body-parser')

const keys = new Keychain();

route.use(bodyParser.json());

route.get('/', async (req, res) => {
	const resp = {};
	const list = await keys.getList(resp);
	res.json(list);
});

route.post('/create', async (req, res) => {
	try {
		const result = await keys.createKey(req.body.name.toLowerCase());
		res.json(result);
	} catch(err) {
		console.log('err', err);
		res.json(false);
	}

	// if (req.body.name) {
	// 	try {
	// 		result = await keys.createKey(req.body.name.toLowerCase());
	// 	} catch (err) {
	// 		console.log('err', err);
	// 		result = false;
	// 	}
	// } else {
	// 	result = false;
	// }

});

module.exports = route;