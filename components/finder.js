const fs = require( 'fs' )

class Finder {
    constructor ( source ) {
        this.source = source
    }

    getDirs ( path = '' ) {
        const items = []

        this.readDir( path ).forEach(item => {
            if ( this.isDir( path + item ) ) items.push( item )
        })

        return items
    }

    readFile ( path = '' ) {
        return this.exists( path ) ? fs.readFileSync( this.source + path ).toString() : null
    }

    readDir ( path = '' ) {
        return fs.readdirSync( this.source + path )
    }

    writeFile (path = '', content = '') {
        fs.writeFileSync(this.source + path, content)
    }

    mkdir ( path = '' ) {
        fs.mkdirSync( this.source + path )
    }

    isDir ( path = '' ) {
        return fs.lstatSync( this.source + path ).isDirectory()
    }

    exists ( path = '') {
        return fs.existsSync( this.source + path )
    }
}

module.exports = Finder