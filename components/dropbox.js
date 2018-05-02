const Frontend = require( './frontend' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()

class Dropbox {
    constructor () {

    }

    * transfer ( response ) {
        console.log( response.payload.message )

        FrontEnd.complete( response.payload )
    }
}

module.exports = Dropbox