const Cleaner = require( './cleaner' )
const UseLib = require( './uselib' )
const fs = require( 'fs' )

const Trash = new Cleaner()
const storage = new UseLib( 'system.map' )

class Network {
    constructor () {
        this.source = 'blockchain.json'
    }

    * getJson ( response ) {
        const string = fs.readFileSync( this.source ).toString()

        try {
            response.payload.response = JSON.parse( string )
        } catch ( error ) {
            console.error( error.name + ': ' + error.message )
        }

        Trash.clean( response.payload )
    }
}

module.exports = Network