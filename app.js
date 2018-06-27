const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const socket = require( 'socket.io' )
const express = require( 'express' )
const uniqid = require( 'uniqid' )
const path = require( 'path' )
const fs = require( 'fs' )
const Facade = require('./components/global')

const PouchDB = require( 'pouchdb' )
PouchDB.plugin( require( 'pouchdb-find' ) )
PouchDB.plugin( require( 'pouchdb-adapter-memory' ) )

const pathDB = path.join(__dirname, 'database')

if (!fs.existsSync(pathDB)) fs.mkdirSync(pathDB);

Facade.publishIO(socket(33999))
Facade.publishDB(
    {
        search: new PouchDB('database/search', {adapter: 'leveldb'}),
        storage: new PouchDB('database/storage', {adapter: 'leveldb'}),
        setting: new PouchDB('database/setting', {adapter: 'leveldb'}),
    }
)
Facade.publishDirs(
    path.join(__dirname, 'dapps/'),
    path.join(__dirname, 'logs/')
)
Facade.publishUniq(uniqid())

const app = express()

app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'assets/')))
app.use(express.static(path.join(__dirname, 'views/')))
app.use(express.static(Facade.__apps()))

app.use('/', require( './routes/index' ))
app.use('/', require( './routes/user' ))
app.use('/keys', require('./routes/keys'))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'))
})

app.use((request, response, next) => response.send('404'))

app.use((error, request, response, next) => {
  response.locals.message = error.message
  response.locals.error = request.app.get('env') === 'development' ? error : {}

  response.status(error.status || 500)
  console.error(error)
})

module.exports = app;
