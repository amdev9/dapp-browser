const vm = require( 'vm' )
const Logger  = require( './logger' )
const Storage = require( './storage' )
const Network = require( './network' )
const EventBus = require( './event' )
const UseLib   = require( './uselib' )
const Connect  = require( './connect' )
const EventMap = require( './event.map' )
const IPFSPubSub = require( './ipfs' )
const UserDappsLoader = require( './user.loader' )

const sandbox = {
    Events  : new EventBus(),
    Logger  : new Logger(),
    Connect : new Connect(),
    Storage : new Storage(),
    Network : new Network(),
    EventMap: new EventMap(),
    system  : new UseLib( 'system.id' ),
    IPFSPubSub: new IPFSPubSub()
}

const context = vm.createContext( sandbox )

class SystemDappsLoader extends UserDappsLoader {
    sourceCode (_path, dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object )
        code += this.getFileSync( _path + '/' + object.main )

        object.index = object.index ? this.source + '/' + dirname + '/' + object.index : null

        this.items.push( object )

        vm.runInContext(code, context)
    }
}

module.exports = SystemDappsLoader