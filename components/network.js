const fs = require( 'fs' );

class Network {
    getJson ( response ) {
        const string = fs.readFileSync( 'blockchain.json' ).toString();
        let object = {}

        try {
            object = JSON.parse( string )
        } catch ( error ) {
            console.error( error.name + ': ' + error.message )
        }

        response.payload.message.docs = object;
        response.payload.callback()
    }
}

module.exports = Network;