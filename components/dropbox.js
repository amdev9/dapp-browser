const Frontend = require( './frontend' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()

class Dropbox {
    constructor () {

    }

    * upload ( response ) {
        const formData = response.payload.message.formData

        // const buffer = fs.readFileSync( path )
        
        console.log( formData )

        FrontEnd.complete( response.payload )
    }
}

module.exports = Dropbox