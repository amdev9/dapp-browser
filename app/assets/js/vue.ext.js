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
        props: ['id', 'src', 'tags', 'thumb'],
        methods: {
            click () {
                this.$root.loading = true
                this.$root.response = {id: this.id, src: this.src}
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
            this.id  = this.$root.response.id
            this.src = this.$root.response.src

            this.$nextTick(function () {
                this.$root.viewapp = true
                this.$root.loading = false
            })
        }
    })

    Vue.component('view-preview', {
        template: preview.import.template(),
        data () {
            return {
                data: {},
                slider: null
            }
        },
        methods: {
            next () {
                this.slider.trigger( 'next.owl.carousel' )
            },
            prev () {
                this.slider.trigger( 'prev.owl.carousel' )
            }
        },
        mounted () {
            this.data = this.$root.response
            
            this.$nextTick(function () {
                this.slider = $( '.carousel-init' ).owlCarousel({
                    nav : false,
                    loop: false,
                    dots: false,
                    items : 3,
                    margin: 15,
                })

                this.$root.loading = false
            })
        }
    })

    Vue.component('view-market', {
        template: market.import.template(),
        data () {
            return {
                data: {}
            }
        },
        methods: {
            change ( name ) {
                for (const key in this.data) this.data[key].active = false
                this.data[name].active = true
            },
            preview ( data ) {
                this.$root.loading = true
                this.$root.response = data
                this.$root.currentView = 'view-preview'
            }
        },
        mounted () {
            let object = {}
            object['all'] = {name: 'all', active: true, items: []}

            for (let i = 0; i < this.$root.response.length; i++) {
                for (let t = 0; t < this.$root.response[i].tags.length; t++) {
                    object[this.$root.response[i].tags[t]] = {name: this.$root.response[i].tags[t], active: false}
                }

                object.all.items.push( this.$root.response[i] )
            }

            for (const key in object) {
                for (let i = 0; i < this.$root.response.length; i++) {
                    if ( !object[key].hasOwnProperty( 'items' ) ) object[key].items = []
                    
                    for (let t = 0; t < this.$root.response[i].tags.length; t++) {
                        if ( key == this.$root.response[i].tags[t] ) {
                            object[key].items.push( this.$root.response[i] )
                        }
                    }
                }
            }

            this.data = object

            this.$nextTick(function () {
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
                
                this.$http.post('/web', {message_type: 'getall', message: {}}, {
                    headers: {'Allow-Origin': this.market}
                }).then(response => {
                    this.$root.response = response.body.message.items
                    this.$root.currentView = 'view-market'
                })
            }
        },
        mounted () {
            this.$http.post('/').then(response => {
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