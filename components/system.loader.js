const UserDappsLoader = require( './user.loader' )
const Dropbox = require( './dropbox' )
const Logger  = require( './logger' )
const Storage = require( './storage' )
const Frontend = require( './frontend' )
const Network = require( './network' )
const Search = require( './search' )
const Finder = require( './finder' )
const Status = require( './status' )
const EventBus = require( './event' )
const UseLib   = require( './uselib' )
const Connect  = require( './connect' )
const Keychain = require( './keychain' )
const IPFSPubSub = require( './ipfs' )
const NetworkAPI = require( './networkAPI' )
const { NodeVM } = require( 'vm2' )

const sandbox = {
    Events  : new EventBus(),
    Logger  : new Logger(),
    Connect : new Connect(),
    Storage : new Storage(),
    Network : new Network(),
    Dropbox : new Dropbox(),
    Search  : new Search(),
    Status  : new Status(),
    mapping : new UseLib( 'system.map' ),
    system  : new UseLib( 'system.id' ),
    Keychain : new Keychain(),
    IPFSPubSub: new IPFSPubSub(),
    NetworkAPI: new NetworkAPI(),
    FrontEnd  : new Frontend(),
    console   : console
}

const vm = new NodeVM({sandbox: sandbox})
const Find = new Finder( 'dapps/system/' )

class SystemDappsLoader extends UserDappsLoader {
    constructor () {
        super()

        this.items = []
        this.dapps = Find.getDirs()
        this.data  = 'manifest.json'
    }

    async sourceCode (dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object )
        code += Find.readFile( dirname + '/' + object.main )

        const _path = 'system/' + dirname + '/'

        object.index = object.index ? _path + object.index : null

        this.items.push( object )

        vm.run( code )
    }

    async onStart () {
        for (let i = 0; i < this.dapps.length; i++) {
            const string = Find.readFile( this.dapps[i] + '/' + this.data )

            try {
                var object = JSON.parse( string )
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
                break
            }

            await this.sourceCode(this.dapps[i], object)
        }
    }
}

module.exports = SystemDappsLoader