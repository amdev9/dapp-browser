;(function () {

    'use strict';
    
    Document.prototype.template = function () {
        return this.querySelector( 'template' )
    }

    const strip = function ( value ) {
        let element = document.createElement( 'div' )
        element.innerHTML = value
        
        let content = element.textContent || ''
        return content
    }

    Vue.filter('truncate', (text, stop, clamp = '...') => {
        return text.slice(0, stop || text.length) + (stop < text.length ? clamp : '')
    })

    Vue.component('app-room', {
        template: room.import.template(),
        props: ['id', 'name', 'time', 'image', 'lastmsg', 'messages'],
        methods: {
            click () {
                this.$root.target = this.id
                console.dir( this.messages )
            }
        }
    })

    Vue.component('app-area', {
        template: area.import.template(),
        props: ['data'],
        methods: {
            submit () {
                let message = strip( this.$refs.message.value )
                console.log( message )
            }
        }
    })

})();