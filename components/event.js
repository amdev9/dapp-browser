const Events = require( 'events' );

// Events
const events = new Events();

// Permissions Method Name
const permissions = Symbol( 'permissions' );

class EventBus {
    constructor () {
        this.data = {}
    }

    publish (to, message_type, payload) {
        events.emit(message_type + to, {
            from: this.data.key,
            message_type: payload.message_type,
            payload: payload
        });
    }

    subscribe (message_type, func) {
        events.on(message_type + this.data.key, ( message ) => func( message ))
    }

    [permissions] ( object ) {
        console.log( object );
    }
}

module.exports = EventBus;