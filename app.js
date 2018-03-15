const express = require( 'express' )
const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const Datastore = require( 'nedb' )
const path = require( 'path' )

global.db = {
	access : new Datastore({filename: 'database/access.db',  autoload: true}),
	storage: new Datastore({filename: 'database/storage.db', autoload: true}),
	setting: new Datastore({filename: 'database/setting.db', autoload: true})
}

global.__apps = path.join(__dirname, 'dapps/')
global.__logs = path.join(__dirname, 'logs/')

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

module.exports = app