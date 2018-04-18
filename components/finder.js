const fs = require( 'fs' )

class Finder {
    constructor ( source ) {
        this.source = source
    }

    getDirSync () {
        let items = []

        fs.readdirSync( this.source ).forEach(element => {
            let object = {}

            if ( fs.lstatSync( this.source + element ).isDirectory() ) {
                items.push( element )
            }
        })

        return items
    }

    getFileSync ( dir ) {
        const _path = this.source + dir + '/manifest.json'
        return fs.existsSync( _path ) ? fs.readFileSync( _path ).toString() : null
    }
}

module.exports = Finder