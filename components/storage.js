const Frontend = require( './frontend' )
const Datastore = require( 'nedb' )
const codb = require( 'co-nedb' )
const UseLib = require( './uselib' )

const FrontEnd = new Frontend()
const mapping  = new UseLib( 'system.map' )
const _private = Symbol( 'private' )

class Storage {
    * insert ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message || {})
        const database = codb( db.storage )

        response.payload.response = yield database.insert( object )

        this[_private]( response.payload )
    }

    * find ( response ) {
        const object = Object.assign({target: response.from}, response.payload.where || {})
        const database = codb( db.storage )

        response.payload.response = yield database.find( object )

        this[_private]( response.payload )
    }

    * findOne ( response ) {
        const object = Object.assign({target: response.from}, response.payload.where || {})
        const database = codb( db.storage )

        response.payload.response = yield database.findOne( object )

        this[_private]( response.payload )
    }

    * update ( response ) {
        const where = Object.assign({target: response.from}, response.payload.where || {})
        const object = Object.assign({target: response.from}, response.payload.message || {})
        const database = codb( db.storage )

        yield database.update(where, object, {multi: true})

        this[_private]( response.payload )
    }

    * remove ( response ) {
        const object = Object.assign({target: response.from}, response.payload.where || {})
        const database = codb( db.storage )

        yield database.remove(object, {multi: true})

        this[_private]( response.payload )
    }

    [_private] ( payload ) {
        db.storage = new Datastore({filename: 'database/storage.db', autoload: true})
        FrontEnd.complete( payload )
    }
}

module.exports = Storage