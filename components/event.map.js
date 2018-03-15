const UseLib = require( './uselib' )

const storage = new UseLib( 'system.map' )

class EventMap {
    * send (from, type) {
        !storage[from] ? storage[from] = {[type]: {}} : storage[from][type] = {}
    }
}

module.exports = EventMap