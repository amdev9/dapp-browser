;(function ( exports ) {
    'use strict'

    new Vue({
        el: '#app',
        data: {
            title: 'Home',
            aside: {},
            market: null,
            frames: {},
            remote: {},
            logger: false,
            notify: false,
            context: null,
            viewapp: false,
            loading: true,
            setting: {},
            response: null,
            apptitle: null,
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
        methods: {
            argv ( value ) {
                if ( !value.id ) return
                
                this.viewapp = true
                this.currentFrame = value.id

                let frames = Object.assign({}, this.frames)
                frames[value.id] = {id: value.id, src: value.src}

                this.frames = frames
                this.pagetitle = value.name
                this.apptitle = value.name.replace(' ', '_').toLowerCase()

                if ( !this.aside.pins.hasOwnProperty( value.id ) )
                    this.aside.apps[value.id] = {icon: value.icon, src: value.src, name: value.name}
            }
        },
        mounted () {
            this.aside = {pins: {}, apps: {}}
            this.pagetitle = this.translate( 'home' )

            document.addEventListener('click', event => this.context = null)

            window.addEventListener('message',  event => {
                this.remote = event.data
                if ( !event.data.start ) this.argv( this.remote )
            })
        }
    })
})( this );