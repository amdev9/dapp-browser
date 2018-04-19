const Frontend = require( './frontend' )
const UseLib = require( './uselib' )
const Finder = require( './finder' )
const fs = require( 'fs' )
const co = require( 'co' )

const FrontEnd = new Frontend()
const Find = new Finder( 'dapps/users/' )

class Search {
    * query ( response ) {
        const message = response.payload.message

        const sql = `SELECT * FROM results WHERE value LIKE '%${message}%'`

        let output = []

        if ( message.length ) yield sqlite.all( sql ).then(rows => output = rows)

        response.payload.response = output

        FrontEnd.complete( response.payload )
    }

    * select ( response ) {
        const target = response.payload.target

        const sql = `SELECT value, url FROM results WHERE key = '${target}'`

        yield sqlite.all( sql ).then(rows => response.payload.response = rows)

        FrontEnd.complete( response.payload )
    }

    * delete ( response ) {
        const message = response.payload.message
        const target = response.payload.target

        const remove = [message.value, message.url, target]
        const sql = `DELETE FROM results WHERE value = ? AND url = ? AND key = ?`

        const prepare = yield sqlite.prepare( sql )
        yield prepare.run( remove )

        prepare.finalize()

        FrontEnd.complete( response.payload )
    }

    * destroy ( response ) { 
        const target = response.payload.target

        const sql = `DELETE FROM results WHERE key = '${target}'`

        yield sqlite.run( sql )

        FrontEnd.complete( response.payload )
    }

    * insert ( response ) {
        const message = response.payload.message
        const target = response.payload.target

        const data = Find.getFileSync( target )

        try {
            var object = JSON.parse( data )
        } catch ( error ) {
            return FrontEnd.complete( response.payload )
        }

        const url = 'arr://' + object.unic + ':mainet/?' + message.url
        const icon = 'users/' + target + '/' + object.icon

        const insert = [object.key, object.name, message.value, url, icon]
        
        const sql = `INSERT INTO results VALUES (?, ?, ?, ?, ?)`

        const prepare = yield sqlite.prepare( sql )
        yield prepare.run( insert )

        prepare.finalize()

        FrontEnd.complete( response.payload )
    }
}

module.exports = Search