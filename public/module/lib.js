;(exports => {

    'use strict';

    const socket = io( 'ws://localhost:3306' );

    const API = Object.freeze({
        Socket: Object.freeze({
            subscribe: (name, func) => {
                socket.on(name, func);
            },
        
            publish: (name, response) => {
                socket.emit(name, response);
            }
        })
    });

    exports.API = API;

})( this );