const path = require( 'path' )
const fs = require( 'fs' )

class DappManager {
    constructor ( proto ) {
        this.argv = null
        this.proto = proto
        this.params = []
    }

    getDirSync ( dirname ) {
        let items = []

        fs.readdirSync( dirname ).forEach(element => {
            let object = {}

            if ( fs.lstatSync( dirname + '/' + element ).isDirectory() ) {
                items.push( element )
            }
        })

        return items
    }

    getFileSync ( filepath ) {
        return fs.existsSync( filepath ) ? fs.readFileSync( filepath ).toString() : null
    }

    findOneUnicKey ( name ) {
        const _path = path.join(__dirname, '../dapps/users/')
        const dapps = this.getDirSync( _path )
        
        let key = null

        for (let i = 0; i < dapps.length; i++) {
            let object = this.getFileSync(_path + dapps[i] + '/manifest.json')

            try {
                object = JSON.parse( object )
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
            }

            if ( object.unic == name ) {
                key = object.key
                break
            }
        }

        return key
    }

    set setValue ( val ) {
        this.argv = String( val )
        
        let string = this.argv.replace(this.proto, '')
        this.params = string.split( ':' )
    }

    get getValue () {
        const name = this.params.length ? this.params.shift() : ''
        const network = this.params.length ? this.params.shift().split( '/' ).join( '' ) : ''

        const key = this.findOneUnicKey( name )
        
        return {
            key: key,
            name: name,
            network: network
        }
    }
}

module.exports = DappManager