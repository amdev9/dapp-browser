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
            sidebar ( object ) {
                if ( !object.id ) return
                
                this.viewapp = true
                this.currentFrame = object.id

                let frames = Object.assign({}, this.frames)
                frames[object.id] = {id: object.id, src: object.src}

                this.frames = frames
                this.pagetitle = object.name
                this.apptitle = object.name.replace(' ', '_').toLowerCase()

                if ( !this.aside.pins.hasOwnProperty( object.id ) )
                    this.aside.apps[object.id] = {icon: object.icon, src: object.src, name: object.name}
            }
        },
        mounted () {
            this.aside = {pins: {}, apps: {}}
            this.pagetitle = this.translate( 'home' )

            document.addEventListener('click', event => this.context = null)

            window.addEventListener('message',  event => {
                this.remote = event.data

                this.sidebar( this.remote )

                this.$nextTick(function () {
                    let content = document.getElementById( this.remote.id )

                    if ( !content ) return
                     
                    if ( content.loaded )
                        return content.contentWindow.postMessage(this.remote.params, '*')
                    
                    content.contentWindow.addEventListener('DOMContentLoaded', () => {
                        content.contentWindow.postMessage(this.remote.params, '*')
                    })
                })
            })
        }
    })
})( this );