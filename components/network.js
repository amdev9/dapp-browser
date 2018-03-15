const fs = require( 'fs' )
const UseLib = require( './uselib' )

const storage = new UseLib( 'system.map' )

class Network {
    constructor () {
        this.source = 'blockchain.json'
    }

    * getJson ( response ) {
        const string = fs.readFileSync( this.source ).toString()
        let object = {}

        try {
            object = JSON.parse( string )
        } catch ( error ) {
            console.error( error.name + ': ' + error.message )
        }

        if ( storage[response.payload.target] ) {
            storage[response.payload.target][response.payload.message_type] = object
        }
    }
}

module.exports = Network