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
        })
    });

    exports.API = API;

})( this );