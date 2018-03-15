class Connect {
    constructor () {
        io.on('connection', socket => {
            socket.on('room', room => socket.join( room ))
        })
    }

    * broadcast ( object ) {
        io.sockets.in( object.room ).emit('message', object)
    }
}

module.exports = Connect