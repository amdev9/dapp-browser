const { fork } = require( 'child_process' )
const { NodeVM } = require( 'vm2' )
const EventBus = require( './event' )
 
const path = require( 'path' )
const fs = require( 'fs' )

class UserDappsLoader {
    constructor ( source ) {
        this.items = []
        this.source = source
        this.data = 'manifest.json'
    }

    getDirSync ( dirname ) {
        const items = []

        fs.readdirSync( dirname ).forEach(element => {
            if ( fs.lstatSync( dirname + '/' + element ).isDirectory() ) {
                items.push( element )
            }
        })

        return items
    }

    getFileSync ( filepath ) {
        return fs.existsSync( filepath ) ? fs.readFileSync( filepath ).toString() : null
    }

    setKeyWords ( object ) {
        for (let i = 0; i < object.keywords.length; i++) {
            const keywords = object.keywords[i]

            for (let value in keywords) {
                const url = 'arr://' + object.unic + ':mainet/?' + keywords[value]
                const insert = [object.hash, object.name, value, url, object.icon]

                const into = `INSERT INTO results VALUES (?, ?, ?, ?, ?)`
                const select = `SELECT value, hash FROM results WHERE hash = '${object.hash}' AND value = '${value}'`

                sqlite.all(select, (error, rows) => {
                    if ( rows.length ) return

                    const prepare = sqlite.prepare( into )

                    prepare.run( insert )
                    prepare.finalize()
                })
            }
        }
    }

    sourceCode (_path, dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object )
        code += this.getFileSync(_path + '/' + object.main)
        
        const source = this.source + '/' + dirname + '/'

        object.icon  = source + object.icon
        object.thumb = source + object.thumb
        object.index = source + object.index

        this.items.push( object )

        const Events = new EventBus()
        Events.data.hash = object.hash

        const child = fork(path.join(__dirname, 'helper'), {stdio: [0,1,2, 'ipc']})

        child.on('message', message => {
            Events.publish(message.to, message.message_type, message.payload)
        })

        Events.everytime(message => child.send( message ))
    
        child.send({init: code})

        this.setKeyWords( object )
    }

    onStart () {
        const dapps = this.getDirSync( __apps + this.source )

        dapps.forEach(dirname => {
            const _path  = __apps + this.source + '/' + dirname
            let object = this.getFileSync( _path + '/' + this.data )

            try {
                object = JSON.parse( object )
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
            }

            this.sourceCode(_path, dirname, object)
        })
    }
}

module.exports = UserDappsLoader