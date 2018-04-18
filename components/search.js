const Frontend = require( './frontend' )
const UseLib = require( './uselib' )
const Finder = require( './finder' )
const fs = require( 'fs' )
const co = require( 'co' )

const FrontEnd = new Frontend()
const Find = new Finder( 'dapps/users/' )

class Search {
    constructor () {
        this.message = String()
    }

    * query ( response ) {
        this.message = response.payload.message

        const sql = `SELECT * FROM results WHERE value LIKE '%${this.message}%'`

        let output = []

        if ( this.message.length ) yield sqlite.all( sql ).then(rows => output = rows)

        response.payload.response = output

        FrontEnd.complete( response.payload )
    }

    * insert ( response ) {
        this.message = response.payload.message
        const target = response.payload.target

        const data = Find.getFileSync( target )

        try {
            var object = JSON.parse( data )
        } catch ( error ) {
            return FrontEnd.complete( response.payload )
        }

        const url = 'arr://' + object.unic + ':mainet/?' + this.message.url
        const icon = 'users/' + target + '/' + object.icon

        const insert = [object.key, object.name, this.message.value, url, icon]
        
        const sql = `INSERT INTO results VALUES (?, ?, ?, ?, ?)`

        const prepare = yield sqlite.prepare( sql )
        yield prepare.run( insert )

        prepare.finalize()

        FrontEnd.complete( response.payload )
    }
}

module.exports = Search