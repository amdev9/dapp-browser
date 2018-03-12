;(function ( exports ) {

    'use strict'

    Document.prototype.template = function () {
        return this.querySelector( 'template' )
    }

    Vue.filter('capitalize', function (value) {
        if ( !value ) return ''

        value = value.toString()
        return value.charAt( 0 ).toUpperCase() + value.slice( 1 )
    })      

    Vue.component('app-header', {
        template: header.import.template(),
        methods: {
            tohome () {
                this.$root.loading = true
                this.$root.viewapp = false
                this.$root.currentView = 'view-index'
            }
        }
    })

    Vue.component('app-aside', {
        template: aside.import.template()
    })

    Vue.component('app-logger', {
        template: logger.import.template()
    })

    Vue.component('app-notify', {
        template: notify.import.template()
    })

    Vue.component('app-card', {
        template: card.import.template(),
        props: ['id', 'src', 'type', 'thumb'],
        methods: {
            click () {
                this.$root.loading = true
                this.$root.currentFrame = {id: this.id, src: this.src}
                this.$root.currentView = 'view-frame'
            }
        }
    })

    Vue.component('view-frame', {
        template: frame.import.template(),
        data () {
            return {
                id : null,
                src: null
            }
        },
        mounted () {
            this.id  = this.$root.currentFrame.id
            this.src = this.$root.currentFrame.src

            this.$nextTick(function () {
                this.$root.viewapp = true
                this.$root.loading = false
            })
        }
    })

    Vue.component('view-market', {
        template: market.import.template(),
        data () {
            return {
                data: [],
                tabs: {}
            }
        },
        methods: {
            change ( name ) {
                for (const key in this.tabs) this.tabs[key].active = false
                this.tabs[name].active = true
            }
        },
        mounted () {
            this.$root.$once('view-market', response => {
                let object = {}
                object['all'] = {name: 'all', active: true, items: []}

                for (let i = 0; i < response.length; i++) {
                    for (let t = 0; t < response[i].tags.length; t++) {
                        object[response[i].tags[t]] = {name: response[i].tags[t], active: false}
                    }

                    object.all.items.push( response[i] )
                }

                for (const key in object) {
                    for (let i = 0; i < response.length; i++) {
                        if ( !object[key].hasOwnProperty( 'items' ) ) object[key].items = []
                        
                        for (let t = 0; t < response[i].tags.length; t++) {
                            if ( key == response[i].tags[t] ) {
                                object[key].items.push( response[i] )
                            }
                        }
                    }
                }

                this.tabs = object
                this.$root.loading = false
            })
        }
    })

    Vue.component('view-index', {
        template: index.import.template(),
        data () {
            return {
                pins: [],
                market: {},
                userapps: []
            }
        },
        methods: {
            tomarket () {
                this.$root.loading = true
                this.$root.viewapp = false
                this.$root.currentView = 'view-market'

                this.$root.$emit('view-market', 'response.body.message.items')
                
                this.$http.post('/web', {message_type: 'getall', message: {}}, {
                    headers: {'Allow-Origin': this.market}
                }).then(response => {
                    this.$root.$emit('view-market', response.body.message.items)
                })
            }
        },
        mounted () {
            this.$http.post( '/' ).then(response => {
                let data = response.body

                this.pins = data.pins
                this.userapps = data.userapps
                this.market = data.market ? data.market.key : {}

                this.$nextTick(function () {
                    this.$root.loading = false
                })
            }, error => {
                console.log( error )
            })
        }
    })

})( this );