const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const path = require( 'path' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const Datastore = require( 'nedb' );

// Database Application
global.db = {
	access : new Datastore({filename: 'database/access.db',  autoload: true}),
	setting: new Datastore({filename: 'database/setting.db', autoload: true}),
	storage: new Datastore({filename: 'database/storage.db', autoload: true})
};

// Socket IO
global.io = require( 'socket.io' )( 4040 );

// Dirname
global.__public = path.join(__dirname, '/public/');
global.__apps = path.join(__dirname, '/dapps/');
global.__logs = path.join(__dirname, '/logs/');

// Application
const app = express();

// Settings
app.set('view engine', 'html');
// app.use(logger( 'dev' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static( __public ));
app.use(express.static( __apps ));

// Template engine
nunjucks.configure('views', {
	autoescape: true,
	express: app,
	noCache: true,
	watch: true
});

// Routes
const index = require( './routes/index' );
const user = require( './routes/user' );

// Route handler
app.use('/', index);
app.use('/', user);

// Catch 404 and forward to error handler
app.use((request, response, next) => {
	response.render('layouts/404', {
		title: '404'
	});
});

// Error handler
app.use((err, request, response, next) => {
	// export NODE_ENV=production
	response.locals.message = err.message;
	response.locals.error = request.app.get( 'env' ) === 'development' ? err : {};

	response.status(err.status || 500);
	response.render( 'error' );
});

module.exports = app;