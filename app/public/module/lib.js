;(exports => {

    'use strict';

    const socket = io( 'ws://localhost:3000' );
    const _private = Symbol( 'private' );

    const API = Object.freeze({
        Socket: Object.freeze({
            subscribe: (name, func) => {
                socket.on(name, func);
            },
        
            publish: (name, response) => {
                socket.emit(name, response);
            },

            connect: (name, func) => {
                socket.emit( name ).on(name, func);
            }
        }),

        Http: Object.freeze({
            get: (url, func) => {
                var request = new XMLHttpRequest();
    
                request.open('get', url);
                API.Http[_private](request, func);
                request.send();
            },

            post: (url, data, func) => {
                var request = new XMLHttpRequest();
    
                request.open('post', url);
                request.setRequestHeader('Content-Type', 'application/json');

                API.Http[_private](request, func);
    
                request.send( JSON.stringify( data ) );
            },
            
            [_private]: (http, func) => {
                http.onreadystatechange = function () {
                    if ( this.readyState == 4 && this.status == 200 ) {
                        if ( func ) func( this.response )
                    }
                }
            }
        })
    });

    exports.API = API;

})( this );