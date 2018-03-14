const Events = require( 'events' )

const events = new Events()

class EventBus {
    constructor () {
        this.data = {}
    }

    publish (to, message_type, payload) {
        events.emit(message_type + to, {
            from: this.data.key,
            message_type: payload.message_type,
            payload: payload
        })
    }

    subscribe (message_type, func) {
        events.on(message_type + this.data.key, message => func( message ))
    }
}

module.exports = EventBus