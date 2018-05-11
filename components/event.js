const Emitter = require('co-emitter')
const UseLib = require( '../components/uselib' )
const uniqid = require( 'uniqid' )

const Events = new Emitter()
const mapping = new UseLib( 'system.map' )

class EventBus {
    constructor () {
        this.data = {}
    }

    * publish (to, message_type, payload) {
        let object = {
            from: this.data.hash,
            message_type: payload.message_type,
            payload: payload
        }

        Events.emit(to, object)
        yield Events.emit(message_type + to, object)
    }

    subscribe (message_type, func) {
        Events.on(message_type + this.data.hash, function * ( message ) {
            yield func( message )
        })
    }

    everytime ( func ) {
        Events.on(this.data.hash, message => {
            func( message )
        })
    }
}

module.exports = EventBus