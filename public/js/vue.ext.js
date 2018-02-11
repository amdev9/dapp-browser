;(exports => {

    'use strict';

    
    // Vue Options
    // ------------------------------------------------------ //

    Vue.options.delimiters = ['${', '}'];


    // Vue Hide Element
    // ------------------------------------------------------ //

    Vue.prototype.$hideEls = ( value ) => {
        [].forEach.call(value, element => {
            element.classList.add( 'd-none' );
            element.classList.remove( 'active' )
        })
    }


    // Vue Create Element
    // ------------------------------------------------------ //

    Vue.prototype.$createEl = (name, attrs, classes) => {
        let element = document.createElement( name );

        let _attrs = attrs || {}
        let _classes = classes || []

        for (let key in _attrs) {
            element.setAttribute(key, _attrs[key]);
        }

        element.classList.add( ... _classes );

        return element;
    }


    // Vue HTTP Request
    // ------------------------------------------------------ //

    Vue.prototype.$http = {
        get: function (url, func) {
            var request = new XMLHttpRequest();

            request.open('get', url);
            Vue.prototype.$http._ready(request, func);
            request.send();
        },
        post: function (url, data, func) {
            var request = new XMLHttpRequest();

            request.open('post', url);
            request.setRequestHeader('Content-Type', 'application/json');
            Vue.prototype.$http._ready(request, func);

            request.send( JSON.stringify( data ) );
        },
        _ready: (http, func) => {
            http.onreadystatechange = function () {
                if ( this.readyState == 4 && this.status == 200 ) func( this.response )
            }
        }
    }

})( this );