const express = require( 'express' )
const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const socket = require( 'socket.io' )
const logger = require( 'morgan' )
const path = require( 'path' )
const http = require( 'http' )
const os = require('os')

// Dirname
// const dirname = '/Market/'
// global.__apps = os.homedir() + dirname
global.__apps = path.join(__dirname, 'dapps/')
global.__logs = path.join(__dirname, 'logs/')

// Application
const app = express()

// Settings
app.set('view engine', 'html')
// app.use(logger( 'dev' ))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static( path.join(__dirname, 'assets/') ))
app.use(express.static( path.join(__dirname, 'views/') ))
app.use(express.static( __apps ));

// Routes
const index = require( './routes/index' )
const user = require( './routes/user' )

// Route handler
app.use('/', index)
app.use('/', user)

app.get('/', (request, response) => {
	response.sendFile( path.join(__dirname, 'index.html') )
})

// Catch 404 and forward to error handler
app.use((request, response, next) => response.send( '404' ))

// Error handler
app.use((err, request, response, next) => {
	response.locals.message = err.message
	response.locals.error = request.app.get( 'env' ) === 'development' ? err : {}

	response.status(err.status || 500)
	response.send( err.status || 500 )
});

const server = http.createServer( app ).listen( 3000 )
global.io = socket(server, {wsEngine: 'ws'})

module.exports = app