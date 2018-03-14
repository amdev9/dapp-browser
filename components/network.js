const fs = require( 'fs' );

class Network {
    constructor () {
        this.source = 'blockchain.json'
    }

    * getJson ( response ) {
        const string = fs.readFileSync( this.source ).toString();
        let object = {}

        try {
            object = JSON.parse( string )
        } catch ( error ) {
            console.error( error.name + ': ' + error.message )
        }

        response.payload.message.items = object;
    }
}

module.exports = Network;