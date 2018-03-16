const Emitter = require('co-emitter')

const Events = new Emitter()

class EventBus {
    constructor () {
        this.data = {}
    }

    * publish (to, message_type, payload) {
        yield Events.emit(message_type + to, {
            from: this.data.key,
            message_type: payload.message_type,
            payload: payload
        })
    }

    subscribe (message_type, func) {
        Events.on(message_type + this.data.key, function * ( message ) {
            yield func( message )
        })
    }
}

module.exports = EventBus