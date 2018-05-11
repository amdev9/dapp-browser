const path = require( 'path' )
const fs = require( 'fs' )

class DappManager {
    constructor ( proto ) {
        this.argv = []
        this.params = {}
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
                let url = 'users/' + object.hash + '/'

                data.id = object.hash
                data.name = object.name
                data.icon = url + object.icon
                data.src = url + object.index
                
                break
            }
        }

        return data
    }

    set setValue ( value ) {
        let string = String( value ).split( '://' ).pop()
        let array = string.split( '?' )
        
        let argv = array.shift().replace(RegExp('/', 'g') , '')
         
        this.argv = argv.split( ':' )

        if ( !array.length ) return

        let params = array.shift()
        let object = params.split( '&' )

        for (let i = 0; i < object.length; i++) {
            let keyval = object[i].split( '=' )
            this.params[keyval.shift()] = keyval.shift()
        }
    }

    get getValue () {
        if ( !this.argv.length ) return {}

        const name = this.argv.shift()
        const network = this.argv.shift()

        const data = this.findOneData( name )
        data.network = network
        data.params = this.params

        return data
    }
}

module.exports = DappManager