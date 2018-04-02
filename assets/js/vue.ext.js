;(function ( exports ) {

    'use strict'

    Element.prototype.dropdown = function () {
        let closest = this.closest( '.dropdown' )
        let item = this.closest( '.dropdown-item' )

        document.querySelectorAll( '.dropdown' ).forEach(element => {
            if ( element != closest ) element.classList.remove( 'show' )
        })

        if ( !closest ) return

        let target = closest.querySelector( '.dropdown-target' )

        if ( item ) target.innerText = item.firstChild.innerText
        
        closest.classList[closest.classList.contains( 'show' ) ? 'remove' : 'add']( 'show' )
    }

    Document.prototype.template = function () {
        return this.querySelector( 'template' )
    }

    document.addEventListener('click', event => event.target.dropdown())

    Vue.use(MultiLanguage, {
        default: 'en',
        en: i18n_en,
        ru: i18n_ru
    })

    Vue.filter('capitalize', function (value) {
        if ( !value ) return ''

        value = value.toString()
        return value.charAt( 0 ).toUpperCase() + value.slice( 1 )
    }) 
    
    Vue.component('app-modal', {
        template: modal.import.template(),
        props: ['type'],
        data () {
            return {
                title: null,
                content: null,
                visible: false
            }
        },
        methods: {
            cancel () {
                this.visible = false
            },
            accept () {
                this.$http.post(this.type, {target: this.$root.currentFrame})
                this.visible = false
            }
        },
        mounted () {
            API.Socket.subscribe('access', response => {
                let items = response.rows
                for (let i = 0; i < items.length; i++) items[i] = '<b>' + items[i] +'</b>'

                this.title = 'Access'
                this.content = '<p>' + response.message +'</p>' + items.join( ', ' )
                this.visible = true
            });
        }
    })

    Vue.component('app-context', {
        template: context.import.template(),
        props: ['data'],
        methods: {
            pin () {
                this.$root.aside.pins[this.data.id] = this.$root.aside.apps[this.data.id]
                delete this.$root.aside.apps[this.data.id]
            },
            app () {
                this.$root.aside.apps[this.data.id] = this.$root.aside.pins[this.data.id]
                delete this.$root.aside.pins[this.data.id]
            },
            change () {
                this.data.type == 'app' ? this.pin() : this.app()

                this.$http.post('/setting.pin', {key: this.data.id}).then(response => {
                    console.log( response.body )
                })
            },
            close () {
                let frames = Object.assign({}, this.$root.frames)
                delete frames[this.data.id]

                this.$root.frames = frames

                if ( this.data.id == this.$root.currentFrame ) {
                    this.$root.viewapp = false
                    this.$root.pagetitle = this.translate( 'home' )
                    this.$root.currentView = 'view-index'
                }
                     
                if ( this.data.type == 'app' ) 
                    delete this.$root.aside.apps[this.data.id]
            }
        },
        mounted () {
            this.$el.style.top = this.data.screen.y + 'px'
            this.$el.style.left = this.data.screen.x + 'px'
        }
    })

    Vue.component('app-header', {
        template: header.import.template(),
        data () {
            return {
                search: false
            }
        },
        methods: {
            tohome () { 
                this._reset()
                this.$root.apptitle = null
                this.$root.pagetitle = this.translate( 'home' )
                this.$root.currentView = 'view-index'
            },
            prevent () {
                this.$root.currentView = this.$root.preventView
                this.$root.preventView = null
            },
            notify () {
                this.$root.notify = !this.$root.notify
            },
            setting () {
                this._reset()
                this.$root.pagetitle = 'Setting'
                this.$root.currentView = 'view-setting'
            },
            _reset () {
                this.$root.viewapp = false
                this.$root.preventView = null
                this.$root.currentFrame = null
            }
        }
    })

    Vue.component('app-aside', {
        template: aside.import.template()
    })

    Vue.component('app-opened', {
        template: opened.import.template(),
        props: ['id', 'image', 'icon', 'src', 'name'],
        methods: {
            click () {
                let frames = Object.assign({}, this.$root.frames)
                frames[this.id] = {id: this.id, src: this.src}

                this.$root.viewapp = true
                this.$root.frames = frames
                this.$root.preventView = null
                this.$root.currentFrame = this.id
                this.$root.pagetitle = this.name
                this.$root.apptitle = this.name.replace(' ', '_').toLowerCase()
            },
            context ( event ) {
                this.$root.context = {
                    id: this.id,
                    type: this.$root.aside.apps[this.id] ? 'app' : 'pin',
                    screen: {x: event.clientX, y: event.clientY}
                }
            },
            _favicon () {
                let image = new Image
                image.src = this.icon

                image.onerror = () => this.icon = this.image
            },
        },
        mounted () {
            this._favicon()
        },
        updated () {
            this._favicon()
        }
    })

    Vue.component('app-logger', {
        template: logger.import.template(),
        data () {
            return {
                open: false,
                content: ''
            }
        },
        methods: {
            toogle () {
                this.open = !this.open
                this.$root.logger = this.open
                this.$refs.console.scrollTop = this.$refs.console.scrollHeight
                
                if ( !this.$root.logger ) return

                setTimeout(() => {
                    let frame = document.getElementById( this.$root.currentFrame )
                    frame.contentWindow.scrollTo(0, frame.contentDocument.body.clientHeight)
                }, 0)
            }
        },
        mounted () {
            API.Socket.subscribe('console', response => {
                let string = document.createElement( 'p' )
                string.innerHTML = response.time + ' : ' + response.target + ' : <span class="' + response.type.toLowerCase() + '">' + response.type + '</span> : ' + JSON.stringify( response.message )
                
                this.$refs.console.appendChild( string )
                this.$refs.console.scrollTop = this.$refs.console.scrollHeight
            })
        }
    })

    Vue.component('app-notify', {
        template: notify.import.template(),
        data () {
            return {
                empty: false
            }
        },
        methods: {
            destroy ( event ) {
                let children = event.currentTarget.closest( '.notifications-body' ).children
                let content = event.currentTarget.closest( '.notifications-content' )
                content.parentNode.removeChild( content )

                if ( !children.length ) this.empty = true
            }
        }
    })

    Vue.component('app-card', {
        template: card.import.template(),
        props: ['id', 'src', 'tags', 'thumb', 'icon', 'name'],
        methods: {
            click () {
                this.$root.viewapp = true
                this.$root.currentFrame = this.id

                let frames = Object.assign({}, this.$root.frames)
                frames[this.id] = {id: this.id, src: this.src}

                this.$root.frames = frames
                this.$root.pagetitle = this.name
                this.$root.apptitle = this.name.replace(' ', '_').toLowerCase()

                if ( !this.$root.aside.pins.hasOwnProperty( this.id ) )
                    this.$root.aside.apps[this.id] = {icon: this.icon, src: this.src, name: this.name}
            }
        }
    })

    Vue.component('view-frame', {
        template: frame.import.template(),
        props: ['id', 'src'],
        mounted () {
            this.$root.loading = true

            this.$nextTick(function () {
                this.$root.loading = false
            })
        }
    })

    Vue.component('view-setting', {
        template: setting.import.template(),
        data () {
            return {
                view: 'general'
            }
        },
        methods: {
            change ( event ) {
                this.view = event.currentTarget.name
            },
            submit ( event ) {
                let form = $( event.target ).serialize().split( '&' )
                let name = event.target.name

                let serialize = {}

                for (let i = 0; i < form.length; i++) {
                    let value = form[i].split( '=' )
                    serialize[value.shift()] = value.shift()
                }

                serialize = Object.assign({type: 'setting', group: name}, serialize)

                this.$http.post('/setting.setting', {where: {type: 'setting', group: name}, message: serialize}).then(response => {
                    alert( 'Success !' )
                })
            }
        },
        mounted () {
            this.$root.loading = true

            this.$nextTick(function () {
                $( 'select' ).niceSelect()

                this.$root.loading = false
            })
        },
        updated () {
            $( 'select' ).niceSelect()
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
            this.$root.loading = true
            this.data = this.$root.response
            
            this.$nextTick(function () {
                this.slider = $( '.carousel-init' ).owlCarousel({
                    nav : false,
                    loop: false,
                    dots: false,
                    items : 3,
                    margin: 15,
                })

                this.$root.pagetitle = this.data.name
                this.$root.preventView = 'view-market'
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
                this.$root.response = data
                this.$root.currentView = 'view-preview'
            }
        },
        mounted () {
            this.$root.loading = true

            this.$http.post('/web', {message_type: 'market', message: {}}, {
                headers: {'Allow-Origin': this.$root.market}
            }).then(response => {
                let items = response.body.response

                let object = {}

                object['all'] = {name: 'all', active: true, items: []}

                for (let i = 0; i < items.length; i++) {
                    for (let t = 0; t < items[i].tags.length; t++) {
                        object[items[i].tags[t]] = {name: items[i].tags[t], active: false}
                    }

                    object.all.items.push( items[i] )
                }

                for (const key in object) {
                    for (let i = 0; i < items.length; i++) {
                        if ( !object[key].hasOwnProperty( 'items' ) ) object[key].items = []
                        
                        for (let t = 0; t < items[i].tags.length; t++) {
                            if ( key == items[i].tags[t] ) {
                                object[key].items.push( items[i] )
                            }
                        }
                    }
                }

                this.data = object
                this.$root.pagetitle = 'Market'
                this.$root.preventView = null

                this.$nextTick(function () {
                    this.$root.loading = false
                })
            })
        }
    })

    Vue.component('view-index', {
        template: index.import.template(),
        data () {
            return {
                market: {},
                userapps: []
            }
        },
        methods: {
            tomarket () {
                this.$root.viewapp = false
                this.$root.currentView = 'view-market'
            }
        },
        mounted () {
            this.$root.loading = true

            this.$http.post('/').then(response => {
                let data = response.body

                this.userapps = data.userapps
                this.$root.market = data.market ? data.market.key : null

                data.setting.forEach(item => this.$root.setting[item.group] = item)

                data.pins.forEach(app => {
                    this.$root.aside.pins[app.key] = {
                        src: app.index,
                        icon: app.icon,
                        name: app.name
                    }
                })

                this.$nextTick(function () {
                    this.$root.loading = false
                    this.$root.argv( this.$root.remote )
                })
            })
        }
    })

})( this );