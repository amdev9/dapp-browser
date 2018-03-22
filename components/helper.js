const ProcessBus = require( './process' )
const UseLib = require( './uselib' )
const { NodeVM } = require( 'vm2' )

let sandbox = {Events: new ProcessBus(), system: new UseLib( 'system.id' )}  

process.on('message', message => {
    console.log( message )
    if ( message.init ) {
        new NodeVM({sandbox: sandbox}).run( message.init )
    } else {
        console.log( message )
        sandbox.Events.inject( message )
    }
})