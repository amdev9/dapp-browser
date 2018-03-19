const datetime = require( 'node-datetime' )
const username = require( 'username' )
const UseLib = require( './uselib' )

const system  = new UseLib( 'system.id' )
const storage = new UseLib( 'system.map' )

class Connect {
    constructor () {
        io.on('connection', socket => {
            socket.on('room', room => socket.join( room ))
        })
    }

    * broadcast ( response ) {
        const _name_ = response.payload.target // Room Name
        const message = response.payload.message
        const object = JSON.parse( message )

        object.datetime = datetime.create().format( 'd-m-Y H:M:S' )
        object.username = username.sync()

        io.sockets.in( _name_ ).emit('message', JSON.stringify( object ))
    }
}

module.exports = Connect