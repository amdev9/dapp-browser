const child_process = require( 'child_process' )
const EventBus = require( './event' )
const UseLib = require( './uselib' )
const { NodeVM } = require( 'vm2' )
 
const path = require( 'path' )
const fs = require( 'fs' )
const co = require( 'co' )

class UserDappsLoader {
    constructor (data, source) {
        this.items = []
        this.data = data
        this.source = source
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

    runInContext () {
        const dapps = this.getDirSync( __apps + this.source )

        dapps.forEach(dirname => {
            let _path  = __apps + this.source + '/' + dirname
            let object = this.getFileSync( _path + '/' + this.data )

            try {
                object = JSON.parse( object )
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
            }

            this.sourceCode(_path, dirname, object)
        })
    }

    sourceCode (_path, dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object )
        code += this.getFileSync( _path + '/' + object.main )
         
        object.icon  = this.source + '/' + dirname + '/' + object.icon
        object.thumb = this.source + '/' + dirname + '/' + object.thumb
        object.index = this.source + '/' + dirname + '/' + object.index

        this.items.push( object )

        // let sandbox = {Events: new EventBus(), system: new UseLib( 'system.id' )}
        // new NodeVM({sandbox: sandbox}).run( code )

        const Events = new EventBus()
        Events.data.key = object.key

        const child = child_process.fork( path.join(__dirname, 'helper'), {stdio: [0,1,2, 'ipc']} )

        child.on('message', message => co(function * () {
            yield Events.publish(message.to, message.message_type, message.payload)
        }))

        Events.everytime(message => child.send( message ))

        child.send({init: code})
    }
}

module.exports = UserDappsLoader