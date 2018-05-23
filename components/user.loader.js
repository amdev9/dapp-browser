const { fork } = require( 'child_process' )
const { NodeVM } = require( 'vm2' )
const Finder = require( './finder' )
const EventBus = require( './event' )
 
const path = require( 'path' )
const fs = require( 'fs' )

const Find = new Finder( 'dapps/users/' )

class UserDappsLoader {
    constructor () {
        this.items = []
        this.dapps = Find.getDirs()
        this.data  = 'manifest.json'
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

    sourceCode (dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object )
        code += Find.readFile(dirname + '/' + object.main)
        
        const _path = 'users/' + dirname + '/'

        object.icon  = _path + object.icon
        object.thumb = _path + object.thumb
        object.index = _path + object.index

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
        for (let i = 0; i < this.dapps.length; i++) {
            const string = Find.readFile( this.dapps[i] + '/' + this.data )

            try {
                var object = JSON.parse( string )
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
                break
            }

            this.sourceCode(this.dapps[i], object)
        }
    }
}

module.exports = UserDappsLoader