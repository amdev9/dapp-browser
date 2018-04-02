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

    findOneData ( name ) {
        const _path = path.join(__dirname, '../dapps/users/')
        const dapps = this.getDirSync( _path )
        
        const data = {}

        for (let i = 0; i < dapps.length; i++) {
            let object = this.getFileSync(_path + dapps[i] + '/manifest.json')

            try {
                object = JSON.parse( object )
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
            }

            if ( object.unic == name ) {
                let url = 'users/' + object.key + '/'

                data.id = object.key
                data.name = object.name
                data.icon = url + object.icon
                data.src = url + object.index
                
                break
            }
        }

        return data
    }

    set setValue ( val ) {
        this.argv = String( val )
        
        let string = this.argv.replace(this.proto, '')
        this.params = string.split( ':' )
    }

    get getValue () {
        const name = this.params.length ? this.params.shift() : ''
        const network = this.params.length ? this.params.shift().split( '/' ).join( '' ) : ''

        const data = this.findOneData( name )
        data.network = network

        return data
    }
}

module.exports = DappManager