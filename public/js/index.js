;(exports => {

    'use strict';

    
    const wrapper = document.querySelector( '.wrapper' );

    Element.prototype.$dropdown = function () {
        const dropdown = Array.from( document.querySelectorAll( '.dropdown' ) );
        const closest  = event.target.closest( '.dropdown' );

        if ( closest ) {
            if ( event.target.classList.contains( 'dropdown-item' ) ) {
                let button = closest.querySelector( 'button' );
                button.innerHTML = event.target.childNodes[0].nodeValue;
            }

            closest.classList[closest.classList.contains( 'show' ) ? 'remove' : 'add']( 'show' )
        } else {
            dropdown.forEach(element => element.classList.remove( 'show' ))
        }
    }


    // Console
    // ------------------------------------------------------ //
    const _console = new Vue({
        el: '.view-code',
        data: {
            visible: false
        },
        methods: {
            toogle: function () {
                this.visible = !this.visible;
                this.$refs.logger.scrollTop = this.$refs.logger.scrollHeight;
            }
        },
        computed: {
            content: {
                set: function ( value ) {
                    let string = this.$createEl( 'p' );
                    string.innerHTML = value;

                    this.$refs.logger.appendChild( string );
                    this.$refs.logger.scrollTop = this.$refs.logger.scrollHeight;
                }
            }
        }
    });


    // Context Menu
    // ------------------------------------------------------ //
    const _context = new Vue({
        el: '.contextmenu',
        data: {
            show: false,
            target: null
        },
        methods: {
            pin: function () {
                this.$http.post('/setting.pin', {target: this.target}, response => {
                    let object  = JSON.parse( response );
                    let storage = _aside.storage;

                    let pins = _aside.$refs.pins;
                    let apps = _aside.$refs.apps;

                    let item = _aside.$el.querySelector( '[data-key = ' + this.target + ']' );
 
                    (() => object.status ? pins : apps)().appendChild( item );

                    _aside.storage = Array.from( _aside.$refs.pins.children )
                })
            },
            close: function () {
                let view = _windows.$el.querySelector( '#' + this.target );
                let item = _aside.$el.querySelector( '[data-key = ' + this.target + ']' );

                if ( _windows.$el.contains( view ) ) view.parentNode.removeChild( view );

                if ( item.parentNode != _aside.$refs.pins ) item.parentNode.removeChild( item );
                
                if ( _windows.key == this.target ) _windows.show = null;

                _header.title = 'Home';
            }
        },
        watch: {
            show: function ( value ) {
                if ( value === true ) return;

                let children = this.$concat([_aside.$refs.apps.children, _aside.$refs.pins.children])
                children.forEach(element => element.classList.remove( 'focus' ))
            }
        }
    });


    // Header
    // ------------------------------------------------------ //
    const _header = new Vue({
        el: 'header',
        data: {
            title: 'Home',
            visible : false,
            backward: false
        },
        methods: {
            index: function ( event ) {
                let target = event.currentTarget;
                _header.title = 'Home';

                _windows.show = null;
                this.backward = false;

                this.$window( 'content' );
            },
            back: function () {
                this.title = 'Market';
                this.$window( 'market' );

                this.backward = false;
            },
            search: function ( event ) {
                this.visible = !this.visible;

                if ( !this.visible ) this.$refs.search.value = '';
            },
            settings: function () {
                let target = event.currentTarget;
                this.title = target.dataset.title;

                _windows.show = null;
                this.backward = false;

                this.$window( 'settings' );
            },
            notify: function () {
                _notify.visible = !_notify.visible;
            }
        }
    });


    // Sidebar
    // ------------------------------------------------------ //
    const _aside = new Vue({
        el: 'aside',
        data: {
            view: null,
            drag: null,
            margin: 0
        },
        methods: {
            renderer: function ( value ) {
                let children = this.$concat([this.$refs.apps.children, this.$refs.pins.children]);
                children.forEach(element => element.classList.remove( 'active' ));

                let target = this.$el.querySelector( '[data-key = ' + this.key + ']' );
                
                if ( !this.$refs.apps.contains( target ) && !this.$refs.pins.contains( target ) ) {
                    this.view.classList.add( 'active' );
                    this.$refs.apps.appendChild( this.view );
                } else {
                    target.classList.add( 'active' );
                    target.classList.remove( 'd-none' );
                }
            },
            _click: function (event, options) {
                let target = event.currentTarget;
                let children = this.$concat([this.$refs.apps.children, this.$refs.pins.children])
                children.forEach(element => element.classList.remove( 'active' ));
                
                target.classList.add( 'active' );

                _windows.create  = options;
                _header.title    = target.dataset.title;
                _header.backward = false;
            },
            _context: function (event, options) {
                let target = event.currentTarget;
                let bounds = {x: event.clientX, y: event.clientY}
         
                let children = this.$concat([this.$refs.apps.children, this.$refs.pins.children])
                children.forEach(element => element.classList.remove( 'focus' ));
                
                target.classList.add( 'focus' );
                
                _context.$el.style.left = bounds.x + 'px';
                _context.$el.style.top  = bounds.y + 'px';

                _context.target = options.key;
                _context.show = true;
            },
            _mousedown: function ( target ) {
                if ( !this.$mouseLeftButton( event ) ) return;

                let offset = event.pageY;

                this.drag = this.$createEl( 'div' );
                target.parentNode.insertBefore(this.drag, target);
                    
                document.onmousemove = () => this._mousemove(offset, target);
                document.onmouseup   = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;

                    if ( target.classList.contains( 'dragstart' ) ) {
                        target.classList.remove( 'dragstart' );
                        this.drag.parentNode.replaceChild(target, this.drag);
                    } else {
                        this.drag.parentNode.removeChild( this.drag )
                    }

                    this.drag = null;
                    this.margin = 0;

                    if ( this.$refs.pins.contains( target ) ) {
                        this.storage = Array.from( this.$refs.pins.children )
                    }
                }
            },
            _mousemove: function (offset, target) {
                this.margin += Math.abs( offset - event.pageY );
                
                if ( this.margin < 15 ) return;

                target.classList.add( 'dragstart' );
                this.drag.classList.add( 'dragover' );
                
                let icns = target.querySelector( '.icns' );
                icns.style.top = event.pageY - this.drag.offsetHeight / 2 + 'px';
                icns.style.left = (target.parentNode.clientWidth - icns.clientWidth) / 2 + 'px';

                let offsetTop = event.pageY - this.drag.offsetHeight / 2;
                let children  = this.$refs[target.parentNode.className].children;

                for (let i = 0; i < children.length; i++) {
                    if ( offsetTop < children[i].offsetTop + this.drag.offsetHeight ) {
                        children[i].parentNode.insertBefore(this.drag, children[i]);
                        break;
                    } else if ( i == children.length - 1 ) {
                        children[i].parentNode.appendChild( this.drag );
                    }
                }
            }
        },
        mounted: function () {
            let children = Array.from( this.$refs.pins.children );
            let object = this.storage;

            children.forEach(element => {
                let options = Object.assign({}, element.dataset);
                let icns = this.$createEl('div', null, ['icns']);

                let image = new Image();
                image.src = options.icon;

                image.onerror = () => image.src = 'images/favicon.svg';
                image.ondragstart = () => false;

                icns.appendChild( image );
                element.appendChild( icns );

                element.addEventListener('click', event => {
                    this._click(event, options)
                });

                element.addEventListener('contextmenu', event => {
                    this._context(event, options)
                });

                element.addEventListener('mousedown',  () => this._mousedown( element ));

                for (const key in object) {
                    if ( object[key] == element.dataset.key ) {
                        object[key] = element;
                        element.parentNode.removeChild( element )
                    }
                }
            })

            for (const key in object) {
                this.$refs.pins.appendChild( object[key] )
            }
        },
        computed: {
            create: {
                set: function ( options ) {
                    let element = this.$createEl('div', null, ['apps-item']);

                    for (const key in options) {
                        element.dataset[key] = options[key]
                    }
                
                    let icns = this.$createEl('div', null, ['icns']);
                
                    let image = new Image();
                    image.src = options.icon;

                    image.onerror = () => image.src = 'images/favicon.svg';
                    image.ondragstart = () => false;

                    icns.appendChild( image );
                    element.appendChild( icns );

                    element.addEventListener('click', event => {
                        this._click(event, options)
                    });

                    element.addEventListener('contextmenu', event => {
                        this._context(event, options)
                    });

                    element.addEventListener('mousedown',  () => this._mousedown( element ));

                    this.view = element;
                    this.key  = options.key;

                    this.renderer();
                }
            },
            storage: {
                set: function ( array ) {
                    let object = {}

                    array.forEach((element, index) => object[index] = element.dataset.key);
                    localStorage.setItem('sortapp', JSON.stringify( object ))
                },

                get: function () {
                    let storage = localStorage.getItem( 'sortapp' );
                    return JSON.parse( storage );
                }
            }
        }
    });


    // Notifications
    // ------------------------------------------------------ //
    const _notify = new Vue({
        el: '.notifications',
        data: {
            visible: false,
            clean: false
        },
        methods: {
            destroy: function ( event ) {
                let target = event.currentTarget;
                let parent = target.closest( '.notifications-content' );
                parent.parentNode.removeChild( parent );

                let children = this.$el.querySelectorAll( '.notifications-content' );

                if ( !children.length ) this.clean = true;
            }
        }
    })


    // Windows
    // ------------------------------------------------------ //
    const _windows = new Vue({
        el: '.views',
        data: {
            view: null,
            show: null,
            key : null
        },
        methods: {
            renderer: function () {
                this.$hideEls( this.$el.children );

                let target = document.getElementById( this.key );

                if ( !this.$el.contains( target ) ) {
                    this.view.classList.add( 'active' );
                    this.$el.appendChild( this.view );
                    this.view.addEventListener('load', () => this.onload());
                } else {
                    target.classList.add( 'active' );
                    target.classList.remove( 'd-none' );
                }

                this.show = true;
            },
            onload: function () {
                let _document = this.view.contentWindow.document;

                _document.addEventListener('contextmenu', event => event.preventDefault());
                _document.addEventListener('click', event => _context.show = false);
            },
            close: function () {
                this.show = null
            }
        },
        computed: {
            create: {
                set: function ( options ) {
                    this.view = this.$createEl('iframe', {id: options.key, src: options.src});
                    this.key  = options.key;

                    this.renderer();
                }
            }
        },
        watch: {
            show: function ( value ) {
                wrapper.classList[value ? 'add' : 'remove']( 'fixed' );

                if ( value === true ) return;

                this.$hideEls( this.$el.children );

                let children = this.$concat([_aside.$refs.apps.children, _aside.$refs.pins.children]);
                children.forEach(element => element.classList.remove( ... ['active', 'focus']));
            }
        }
    });


    // Applications
    // ------------------------------------------------------ //
    const _apps = new Vue({
        el: '.content .apps',
        methods: {
            view: function ( event ) {
                let target  = event.currentTarget;
                let dataset = {key: target.dataset.key, icon: target.dataset.icon, title: target.dataset.title, src: target.dataset.src}

                _windows.create = dataset;
                _aside.create = dataset;
                _header.title = target.dataset.title;
            }
        },
        mounted: function ( event ) {
            [].forEach.call(this.$el.children, element => {
                let _header = element.querySelector( '.apps-item-header' );
                _header.style.backgroundImage = 'url(' + _header.dataset.thumb + ')';
            });
        }
    });


    // Market
    // ------------------------------------------------------ //
    const _market = new Vue({
        el: '#market',
        data: {
            tabs: {},
            object: []
        },
        methods: {
            init () {
                let target = event.currentTarget;
                _header.title = target.dataset.title;

                this.$http.post('/web', {message_type: 'getall', message: {}}, response => {
                    try {
                        let output = JSON.parse( response );
                        this.object = output.message.docs;
                    } catch ( error ) {
                        return alert( error )
                    }

                    this.create()
                }, target.dataset.key)
            },
            create () {
                this.tabs = {}
                this.tabs['all'] = {class: 'active', items: []}

                for (let i = 0; i < this.object.length; i++) {
                    for (let t = 0; t < this.object[i].tags.length; t++) {
                        this.tabs[this.object[i].tags[t]] = {class: ''}
                    }

                    this.tabs.all.items.push( this.object[i] )
                }

                for (const key in this.tabs) {
                    for (let i = 0; i < this.object.length; i++) {
                        if ( !this.tabs[key].hasOwnProperty( 'items' ) ) this.tabs[key].items = []
                        
                        for (let t = 0; t < this.object[i].tags.length; t++) {
                            if ( key == this.object[i].tags[t] ) {
                                this.tabs[key].items.push( this.object[i] )
                            }
                        }
                    }
                }

                this.$window( 'market' );
            },
            change ( name ) {
                const navigate = Array.from( this.$refs.navigate.querySelectorAll( 'button' ) );
                const category = Array.from( this.$refs.category.querySelectorAll( '.item' ) );

                navigate.forEach(element => element.classList[element.name == name ? 'add' : 'remove']( 'active' ))
                category.forEach(element => element.classList[element.classList.contains( name ) ? 'add' : 'remove']( 'active' ))
            },
            preview ( key ) {
                for (let i = 0; i < this.object.length; i++) {
                    if ( this.object[i].key == key ) {
                        var target = this.object[i];
                        break;
                    }
                }

                _preview.create  = target;
                _header.backward = true
            }
        }
    })


    // Modals
    // ------------------------------------------------------ //
    const _modals = new Vue({
        el: '.modal',
        data: {
            target: null,
            name: null
        },
        methods: {
            hidden: function () {
                this.target.classList.remove( 'show' )
            },
            show: function (name, content) {
                this.name = name;
                this.target = this.$refs[this.name];
                 
                let body = this.target.querySelector( '.modal-body' );

                if ( this.target.contains( body ) ) {
                    body.innerHTML = content;
                    this.target.classList.add( 'show' );
                }
            },
            submit: function () {
                this.$http.post(this.name, {target: _windows.key}, response => {
                    let output = JSON.parse( response )
                    if ( output.status == true ) this.hidden();
                })
            }
        }
    });


    // Preview
    // ------------------------------------------------------ //
    const _preview = new Vue({
        el: '#preview',
        data: {
            size: null, tags: null, images: null, rating: null,
            version: null, updated: null, reviews: null, carousel: null,
            introtext: null, description: null, certificate: null, preview: null
        },
        methods: {
            next () {
                this.carousel.next()          
            },
            prev () {
                this.carousel.previous()          
            }
        },
        computed: {
            create: {
                set ( object ) {
                    for (const key in object) {
                        this[key] = object[key]
                    }

                    _header.title = _header.title + ' - ' + object.name;

                    this.$window( 'preview' );

                    setTimeout(() => {
                        this.carousel = new Flickity(this.$refs.carousel, {
                            contain  : true,
                            cellAlign: 'left',
                            pageDots : false,
                            imagesLoaded: true,
                            prevNextButtons: false,
                            friction: .5
                        })
                    }, 0 );
                }
            }
        }
    });


    // Disabled Context Menu
    // ------------------------------------------------------ //
    document.addEventListener('contextmenu', event => event.preventDefault());


    // Document Event
    // ------------------------------------------------------ //
    document.addEventListener('click', event => {
        _context.show = false;
        event.target.$dropdown()         
    });



    // Market
    // ------------------------------------------------------ //
    document.querySelector( '.view-market' ).addEventListener('click', event => _market.init());

 
    // Socket Console
    // ------------------------------------------------------ //
    API.Socket.subscribe('console', response => {
        _console.content = response.time + ' : ' + response.target + ' : <span class="' + response.type.toLowerCase() + '">' + response.type + '</span> : ' + JSON.stringify( response.message );
    });


    // Socket Access
    // ------------------------------------------------------ //
    API.Socket.subscribe('access', response => {
        let message = response.message;
        let rows = response.rows;

        for (let i = 0; i < rows.length; i++) rows[i] = '<b>' + rows[i] +'</b>';

        _modals.show('access', '<p>' + message +'</p>' + rows.join( ', ' ));
    });

})( this );