;(function ( exports ) {
    'use strict'

    new Vue({
        el: '#app',
        data: {
            title: 'Home',
            aside: {},
            market: null,
            frames: {},
            notify: false,
            context: null,
            viewapp: false,
            loading: true,
            response: null,
            pagetitle: 'Home',
            preventView: null,
            currentView: 'view-index',
            currentFrame: null
        },
        watch: {
            viewapp ( value ) {
                if ( !value ) this.currentFrame = null
            }
        },
        mounted () {
            this.aside = {pins: {}, apps: {}}

            document.addEventListener('click', event => this.context = null)
        }
    })
})( this );