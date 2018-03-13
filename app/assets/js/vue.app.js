;(function ( exports ) {
    'use strict'

    new Vue({
        el: '#app',
        data: {
            title: 'Home',
            viewapp: false,
            loading: true,
            response: null,
            currentView: 'view-index'
        }
    })
})( this );