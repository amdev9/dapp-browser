;(function () {

    'use strict'
    
    Document.prototype.template = function () {
        return this.querySelector( 'template' )
    }

    const strip = function ( value ) {
        let element = document.createElement( 'div' )
        element.innerHTML = value
        
        let content = element.textContent || ''
        return content.trim()
    }

    Vue.filter('truncate', (text, stop, clamp = '...') => {
        return text.slice(0, stop || text.length) + (stop < text.length ? clamp : '')
    })

    Vue.component('app-search', {
        template: search.import.template(),
        data () {
            return {
                data: null
            }
        },
        methods: {
            keyup ( event ) {
                this.data = this._search()

                let value = event.target.value.toLowerCase().trim()
                let object = {}

                for (const key in this.data) {
                    if ( !this.data[key] ) continue
                    if ( this.data[key].name.toLowerCase().includes( value ) ) {
                        object[key] = this.data[key]
                    }
                }

                this.$root.rooms = !value.length ? this.data : object

                if ( this.$root.rooms[this.$root.target] )
                    this.$root.rooms[this.$root.target] = this.$root.current
            },
            _search() {
                let object = this.data ? this.data : this.$root.rooms

                for (const ak in this.$root.rooms) {
                    for (const bk in object) {
                        if ( !object.hasOwnProperty( ak ) ) object[ak] = this.$root.rooms[ak]
                    }
                }

                return object
            }
        }
    })

    Vue.component('app-room', {
        template: room.import.template(),
        props: ['id', 'name', 'time', 'image', 'introtext', 'messages'],
        methods: {
            click () {
                this.$root.target = this.id
                this.$root.current = this.$root.rooms[this.id]
                API.Room.connect( this.id )

                this.$root.$nextTick(function () {
                    let container = document.getElementById( 'overflow' )
                    container.scrollTop = container.scrollHeight
                })
            }
        }
    })

    Vue.component('app-area', {
        template: area.import.template(),
        props: ['data'],
        methods: {
            submit () {
                let message = strip( this.$refs.message.value )
                
                let object = {
                    unic: this.$root.unic,
                    content: message
                }

                API.Room.broadcast({message: object}, () => this.$refs.message.value = '')
            }
        },
        updated () {
            let container = document.getElementById( 'overflow' )
            container.scrollTop = container.scrollHeight
        }
    })

    Vue.component('app-modal', {
        template: modal.import.template(),
        props: ['id', 'title'],
        methods: {
            submit () {
                let key = this.$refs.key.value.trim()
                let name = this.$refs.name.value.trim()
                let object = Object.assign({}, this.$root.rooms)

                if ( object[key] || !name.length ) return

                let avatar = blockies.create({size: 15, scale: 3}).toDataURL()

                object[key] = {
                    key: key,
                    name: name,
                    image: avatar,
                    introtext: String(),
                    messages: []
                }

                API.Room.create(key, () => {
                    let room = Object.assign({key: key}, object[key])
                    
                    API.Http.post('/web', {message_type: 'insert', message: room}, () => {
                        this.$root.rooms = object
                        $( '#' + this.id ).modal( 'hide' )
                    })
                })
            }
        }
    })

})();