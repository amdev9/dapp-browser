const Frontend = require( './frontend' )
const UseLib = require( './uselib' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()
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

        FrontEnd.complete( response.payload )
    }
}

module.exports = Network