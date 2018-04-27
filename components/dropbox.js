const Frontend = require( './frontend' )

const FrontEnd = new Frontend()

class Dropbox {
    constructor () {

    }

    * upload ( response ) {
        const path = response.payload.message.path
        
        // console.log( path )

        FrontEnd.complete( response.payload )
    }
}

module.exports = Dropbox