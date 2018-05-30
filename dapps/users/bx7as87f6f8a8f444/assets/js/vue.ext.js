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

                const value = event.target.value.toLowerCase().trim()
                const object = {}

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
                const object = this.data ? this.data : this.$root.rooms

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
                    const container = document.getElementById( 'overflow' )
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
                const content = strip( this.$refs.message.value )
                API.Room.broadcast({content: content, key: this.$root.target, unic: this.$root.unic}, () => this.$refs.message.value = '')
            }
        },
        updated () {
            const container = document.getElementById( 'overflow' )
            container.scrollTop = container.scrollHeight
        }
    })

    Vue.component('app-modal', {
        template: modal.import.template(),
        props: ['id', 'title'],
        methods: {
            submit () {
                const key = this.$refs.key.value.trim()
                const name = this.$refs.name.value.trim()
                const rooms = Object.assign({}, this.$root.rooms)

                if ( key in rooms || !name.length ) return

                const avatar = blockies.create({size: 15, scale: 3}).toDataURL()

                rooms[key] = {
                    key: key,
                    type: 'room',
                    name: name,
                    image: avatar,
                    messages: [],
                    introtext: '---'
                }

                API.Room.create(key, () => {
                    API.Http.post('/web', {message_type: 'insert', message: rooms[key]}, () => {
                        this.$root.rooms = rooms
                        $( '#' + this.id ).modal( 'hide' )
                    })

                    // API.Http.post('/web', {message_type: 'index', message: {
                    //     value: object[key].name,
                    //     url: 'room=' + object[key].name
                    // }})
                })
            }
        }
    })

})();