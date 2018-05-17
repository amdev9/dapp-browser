const ProcessBus = require( './process' )
const UseLib = require( './uselib' )
const { NodeVM } = require( 'vm2' )

let sandbox = {Events: new ProcessBus(), system: new UseLib( 'system.id' )}

process.on('message', function ( message ) {
    if ( message.init ) return new NodeVM({sandbox: sandbox}).run( message.init )
    sandbox.Events.inject( message )
})