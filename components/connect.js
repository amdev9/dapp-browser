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
        const object = JSON.parse( response.payload.message )

        const _name_ = object.room // Room Name
        const message = response.payload.message

        io.sockets.in( _name_ ).emit('message', message)
    }
}

module.exports = Connect