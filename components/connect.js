const UseLib = require( './uselib' )

const system  = new UseLib( 'system.id' )
const storage = new UseLib( 'system.map' )

const getHeaders = headers => {
    let pathname = headers.referer.replace(headers.origin + '/', '')
    return pathname.replace(/(users\/)|(system\/)/gi, '').split( '/' ).shift()
}

class Connect {
    constructor () {
        io.on('connection', socket => {
            socket.on('room', room => {
                let target = getHeaders( socket.handshake.headers )
                socket.join(room + target)
            })
        })
    }

    * broadcast ( response ) {
        const object = JSON.parse( response.payload.message )
        io.sockets.in( object.room ).emit('message', response.payload.message)
    }

    * joined ( response ) {
        const object = response.payload.message
        io.sockets.in( object.room ).emit('joined', object.peers)
    }

    * detached ( response ) {
        const object = response.payload.message
        io.sockets.in( object.room ).emit('detached', object.peers)
    }
}

module.exports = Connect