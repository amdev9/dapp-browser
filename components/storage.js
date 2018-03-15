const Datastore = require( 'nedb' )
const codb = require( 'co-nedb' )
const UseLib = require( './uselib' )

const storage  = new UseLib( 'system.map' )
const _private = Symbol( 'private' )

class Storage {
    * insert ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        let data = yield database.insert( object )

        if ( storage[response.payload.target] )
            storage[response.payload.target][response.payload.message_type] = data

        this[_private]()
    }

    * find ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        let data = yield database.find( object )

        if ( storage[response.payload.target] )
            storage[response.payload.target][response.payload.message_type] = data

        this[_private]()
    }

    * findOne ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        let data = yield database.findOne( object )

        if ( storage[response.payload.target] )
            storage[response.payload.target][response.payload.message_type] = data

        this[_private]()
    }

    * update ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        yield database.update({target: response.from}, object, {multi: true})

        this[_private]()
    }

    * remove ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        yield database.remove(object, {multi: true})

        this[_private]()
    }

    [_private] () {
        db.storage = new Datastore({filename: 'database/storage.db', autoload: true})
    }
}

module.exports = Storage