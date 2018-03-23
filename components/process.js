const co = require( 'co' )

class ProcessBus {
    constructor () {
        this.handlers = {}
    }

    * publish (to, message_type, payload) {
        process.send({to: to, message_type: message_type, payload: payload})
    }

    subscribe (message_type, func) {
        if ( !this.handlers[message_type] ) {
            this.handlers[message_type] = []
        }

        this.handlers[message_type].push( func )
    }

    inject ( message ) {
        let handlers = this.handlers[message.message_type] || []
        
        handlers.forEach(func => co(function * () {
            yield func( message )
        }))
    }
}

module.exports = ProcessBus
