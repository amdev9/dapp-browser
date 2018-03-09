const electron = require('electron')
const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const socket = require( 'socket.io' );
const logger = require( 'morgan' );
const path = require( 'path' );
const http = require( 'http' );

// Dirname
global.__dbdir  = electron.app.getPath( 'desktop' );
global.__appdir = electron.app.getPath( 'desktop' );

global.__public = path.join(__dirname, 'public/');
global.__apps   = path.join(__dirname, 'dapps/');
global.__logs   = path.join(__dirname, 'logs/');

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
nunjucks.configure('app/views', {
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
	response.locals.message = err.message;
	response.locals.error = request.app.get( 'env' ) === 'development' ? err : {};

	response.status(err.status || 500);
	response.render( 'error' );
});

const server = http.createServer( app ).listen( 3000 );
global.io = socket(server, {wsEngine: 'ws'});

module.exports = app;