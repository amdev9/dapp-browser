const Frontend = require( './frontend' )
const UseLib = require( './uselib' )
const fs = require( 'fs' )
const co = require( 'co' )

const FrontEnd = new Frontend()
const storage = new UseLib( 'system.map' )

class Search {
    constructor () {
        this.string = String
    }

    * query ( response ) {
        this.string = response.payload.message.string

        yield sqlite.all( 'SELECT * FROM results' ).then(function(row){
            console.log( row )
        })

        FrontEnd.complete( response.payload )
    }
}

module.exports = Search