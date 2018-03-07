;(exports => {

    'use strict';

    
    // Vue Options
    // ------------------------------------------------------ //
    Vue.options.delimiters = ['${', '}'];


    // Filters
    // ------------------------------------------------------ //
    Vue.filter('capitalize', function (value) {
        if ( !value ) return '';

        value = value.toString();
        return value.charAt( 0 ).toUpperCase() + value.slice( 1 );
    })      


    // Hide Element
    // ------------------------------------------------------ //
    Vue.prototype.$hideEls = ( value ) => {
        [].forEach.call(value, element => {
            element.classList.add( 'd-none' );
            element.classList.remove( 'active' )
        })
    }


    // Concat HTMLCollection
    // ------------------------------------------------------ //
    Vue.prototype.$concat = ( value ) => {
        let array = [];

        for (let i = 0; i < value.length; i++) {
            array = array.concat( Array.from( value[i] ) )
        }

        return array;
    }


    // Create Element
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


    // HTTP Request
    // ------------------------------------------------------ //
    Vue.prototype.$http = {
        get: function (url, func) {
            var request = new XMLHttpRequest();

            request.open('get', url);
            Vue.prototype.$http._ready(request, func);
            request.send();
        },
        post: function (url, data, func, header) {
            var request = new XMLHttpRequest();

            request.open('post', url);
            request.setRequestHeader('Content-Type', 'application/json');
            
            if ( header ) request.setRequestHeader('Allow-Origin', header);

            Vue.prototype.$http._ready(request, func);

            request.send( JSON.stringify( data ) );
        },
        _ready: (http, func) => {
            http.onreadystatechange = function () {
                if ( this.readyState == 4 && this.status == 200 ) func( this.response )
            }
        }
    }

    
    // Windows
    // ------------------------------------------------------ //
    Vue.prototype.$window = name => {
        let windows = Array.from( document.querySelectorAll( '.window' ) );

        windows.forEach(element => element.classList.add( 'd-none' ));
        document.getElementById( name ).classList.remove( 'd-none' );

        document.body.scrollTop = 0;
    }


    // Detect Mouse Left Button
    // ------------------------------------------------------ //
    Vue.prototype.$mouseLeftButton = event => {
        if ( 'buttons' in event ) return event.buttons == 1;
        
        let button = event.which || event.button;
        return button == 1;
    }

})( this );