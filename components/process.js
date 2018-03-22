const co = require( 'co' )

class ProcessBus {
    constructor () {
        this.handlers = {}
    }

    * publish (to, message_type, payload) {
        console.log('publish')
        process.send({to: to, message_type: message_type, payload: payload})
    }

    subscribe (message_type, func) {
        if ( !this.handlers[message_type] ) {
            this.handlers[message_type] = []
        }

        this.handlers[message_type].push( func )
    }

    inject ( message ) {
        console.log('inject')
        let handlers = this.handlers[message.message_type]
        
        if ( handlers ) handlers.forEach(element => element( message ))
    }
}

module.exports = ProcessBus
