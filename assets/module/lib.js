;(exports => {

    'use strict'

    const socket = io( 'ws://localhost:33999' )
    const _private = Symbol( 'private' )

    var _room = null

    const API = Object.freeze({
        Socket: Object.freeze({
            subscribe: (name, func) => {
                socket.on(name, func)
            },
        
            publish: (name, response) => {
                socket.emit(name, response)
            },

            connect: (name, func) => {
                socket.emit( name ).on(name, func)
            }
        }),

        Room: Object.freeze({
            create: (room, func = () => {}) => {
                API.Room[_private]( room )
                API.Http.post('/web', {message_type: 'create', message: {room: room}}, func)
            },

            connect: (room, func) => {
                API.Room[_private]( room )
                API.Http.post('/web', {message_type: 'connect', message: {room: room}}, func)
            },

            broadcast: (data , func) => {
                let object = Object.assign(data, {room: _room})
                API.Http.post('/web', {message_type: 'broadcast', message: object}, func)
            },

            message: func => {
                API.Socket.subscribe('message', func)
            },

            joined: func => {
                API.Socket.subscribe('joined', func)
            },

            detached: func => {
                API.Socket.subscribe('detached', func)
            },

            [_private]: room => {
                _room = room
                API.Socket.publish('room', room)
            }
        }),

        Http: Object.freeze({
            get: (url, func, sync = false) => {
                var request = new XMLHttpRequest()
    
                request.open('get', url, !sync)
                API.Http[_private](request, func)
                request.send()
            },

            post: (url, data, func, sync = false) => {
                var request = new XMLHttpRequest()
    
                request.open('post', url, !sync)
                request.setRequestHeader('Content-Type', 'application/json')

                API.Http[_private](request, func)
    
                request.send( JSON.stringify( data ) )
            },
            
            [_private]: (http, func) => {
                http.onreadystatechange = function () {
                    if ( this.readyState == 4 && this.status == 200 ) {
                        if ( func ) func( this.response )
                    }
                }
            }
        })
    })

    exports.API = API

})( this );