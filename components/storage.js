const Cleaner = require( './cleaner' )
const Datastore = require( 'nedb' )
const codb = require( 'co-nedb' )
const UseLib = require( './uselib' )

const Trash = new Cleaner()
const mapping  = new UseLib( 'system.map' )
const _private = Symbol( 'private' )

class Storage {
    * insert ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        response.payload.response = yield database.insert( object )

        this[_private]( response.payload )
    }

    * find ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        response.payload.response = yield database.find( object )

        this[_private]( response.payload )
    }

    * findOne ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        response.payload.response = yield database.findOne( object )

        this[_private]( response.payload )
    }

    * update ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        yield database.update({target: response.from}, object, {multi: true})

        this[_private]( response.payload )
    }

    * remove ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)
        const database = codb( db.storage )

        yield database.remove(object, {multi: true})

        this[_private]( response.payload )
    }

    [_private] ( payload ) {
        Trash.clean( payload )
        db.storage = new Datastore({filename: 'database/storage.db', autoload: true})
    }
}

module.exports = Storage