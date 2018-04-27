const UserDappsLoader = require( './user.loader' )
const child_process = require( 'child_process' )
const ProcessBus = require( './process' )
const Dropbox = require( './dropbox' )
const Logger  = require( './logger' )
const Storage = require( './storage' )
const Frontend = require( './frontend' )
const Network = require( './network' )
const Search = require( './search' )
const EventBus = require( './event' )
const UseLib   = require( './uselib' )
const Connect  = require( './connect' )
const IPFSPubSub = require( './ipfs' )
const { NodeVM } = require( 'vm2' )

const sandbox = {
    Events  : new EventBus(),
    Logger  : new Logger(),
    Connect : new Connect(),
    Storage : new Storage(),
    Network : new Network(),
    Dropbox : new Dropbox(),
    Search  : new Search(),
    mapping : new UseLib( 'system.map' ),
    system  : new UseLib( 'system.id' ),
    IPFSPubSub: new IPFSPubSub(),
    FrontEnd  : new Frontend(),
    console   : console,
}

const vm = new NodeVM({sandbox: sandbox})

class SystemDappsLoader extends UserDappsLoader {
    sourceCode (_path, dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object )
        code += this.getFileSync( _path + '/' + object.main )

        object.index = object.index ? this.source + '/' + dirname + '/' + object.index : null

        this.items.push( object )

        vm.run( code )
    }
}

module.exports = SystemDappsLoader