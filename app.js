const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const socket = require( 'socket.io' )
const express = require( 'express' )
const Datastore = require( 'nedb' )
const uniqid = require( 'uniqid' )
const path = require( 'path' )

const PouchDB = require( 'pouchdb' )
PouchDB.plugin( require( 'pouchdb-find' ) )
PouchDB.plugin( require( 'pouchdb-adapter-memory' ) )
PouchDB.plugin( require( 'pouchdb-adapter-node-websql' ) )

global.io = socket( 33999 )

global.db = {
	// access : new PouchDB('database/access', {adapter: 'leveldb'}),
	storage: new Datastore({filename: 'database/storage.db', autoload: true}),
	setting: new PouchDB('database/setting', {adapter: 'leveldb'})
}

db.setting.createIndex({index: {
	name: 'setting',
	fields: ['type']
}})

global.__apps = path.join(__dirname, 'dapps/')
global.__logs = path.join(__dirname, 'logs/')
global.__uniq = uniqid()

const app = express()

app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static( path.join(__dirname, 'assets/') ))
app.use(express.static( path.join(__dirname, 'views/') ))
app.use(express.static( __apps ))

app.use('/', require( './routes/index' ))
app.use('/', require( './routes/user' ))

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

module.exports = app