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


    // Vue Concat HTMLCollection
    // ------------------------------------------------------ //

    Vue.prototype.$concat = ( value ) => {
        let array = [];

        for (let i = 0; i < value.length; i++) {
            array = array.concat( Array.from( value[i] ) )
        }

        return array;
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


    // Dropdown
    // ------------------------------------------------------ //

    Vue.prototype.$dropdown = {
        enable: function (parent = document) {
            let array = Array.from( parent.querySelectorAll( '.dropdown' ) )

            array.forEach(element => {
                const button = element.querySelector( 'button' );
                const items  = Array.from( element.querySelectorAll( 'span' ) );

                button.addEventListener('click', () => this._show( element ));
                items.forEach(item => item.addEventListener('click', () => this._event( button )))
            })
        },
        hidden: function (parent = document) {
            let array = Array.from( parent.querySelectorAll( '.dropdown' ) );
            
            array.forEach(element => {
                const button = element.querySelector( 'button' );
                if ( event.target != button ) element.classList.remove( 'show' )
            });
        },
        _show: function ( target ) {
            target.classList.toggle( 'show' )
        },
        _event: function ( target ) {
            target.innerText = event.target.innerText
        }
    }


    // Detect Mouse Left Button
    // ------------------------------------------------------ //

    Vue.prototype.$mouseLeftButton = event => {
        if ( 'buttons' in event ) return event.buttons == 1;
        
        let button = event.which || event.button;
        return button == 1;
    }

})( this );