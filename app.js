const express = require( 'express' )
const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const Datastore = require( 'nedb' )
const sqlite3 = require( 'co-sqlite3' )
const path = require( 'path' )
const co = require( 'co' )

global.io = require( 'socket.io' )( 3310 )

global.db = {
	access : new Datastore({filename: 'database/access.db',  autoload: true}),
	storage: new Datastore({filename: 'database/storage.db', autoload: true}),
	setting: new Datastore({filename: 'database/setting.db', autoload: true})
}

global.__apps = path.join(__dirname, 'dapps/')
global.__logs = path.join(__dirname, 'logs/')

co(function * () {
	global.sqlite = yield sqlite3( 'database/search.db' )
	yield sqlite.run( 'CREATE TABLE IF NOT EXISTS results (key VARCHAR, name VARCHAR, value VARCHAR, url TEXT, icon TEXT)' )
})

const app = express()

app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static( path.join(__dirname, 'assets/') ))
app.use(express.static( path.join(__dirname, 'views/') ))
app.use(express.static( __apps ))

const index = require( './routes/index' )
const user = require( './routes/user' )

app.use('/', index)
app.use('/', user)

app.get('/', (request, response) => {
	response.sendFile( path.join(__dirname, 'index.html') )
})

app.use((request, response, next) => response.send( '404' ))

app.use((error, request, response, next) => {
	response.locals.message = error.message
	response.locals.error = request.app.get( 'env' ) === 'development' ? error : {}

	response.status(error.status || 500)
	console.error( error )
})

// var xor = require('bitwise-xor');
// var md5 = require('md5');

// var test = xor(new Buffer('3344', 'hex'), new Buffer('00ff', 'hex'))
// console.log( md5( test.toString() ) )

module.exports = app