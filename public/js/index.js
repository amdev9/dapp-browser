;(exports => {

    'use strict';

    
    const wrapper = document.querySelector( '.wrapper' );
    const market  = document.querySelector( '.market' );



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

                _header.$refs.pagetitle.innerHTML = _header.$refs.home.dataset.title;
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
            visible : false,
            backward: false
        },
        methods: {
            index: function ( event ) {
                let target = event.currentTarget;
                this.$refs.pagetitle.innerHTML = target.dataset.title;

                _windows.show = null;
                this.backward = false;

                this.$window( 'content' );
            },
            back: function () {
                this.$refs.pagetitle.innerHTML = 'Market';
                this.$window( 'market' );

                this.backward = false;

                document.body.scrollTop = 0
            },
            search: function ( event ) {
                this.visible = !this.visible;

                if ( !this.visible ) this.$refs.search.value = '';
            },
            settings: function () {
                
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

                _windows.create = options;
                _header.$refs.pagetitle.innerHTML = target.dataset.title;
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

                let target = this.$el.querySelector( '#' + this.key );

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
                _header.$refs.pagetitle.innerHTML = target.dataset.title;
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
        el: '.content .market',
        methods: {
            view: function ( event ) {
                let object = event.currentTarget.dataset;

                _header.backward = true;
                _header.$refs.pagetitle.innerHTML = 'Market - ' + object.type.charAt(0).toUpperCase() + object.type.slice( 1 );

                this.$window( 'app' );
                _preview.init();

                document.body.scrollTop = 0
            },
            switch: function ( target ) {
                for (const key in this.$refs) this.$refs[key].classList.remove( 'active' )
                if ( this.$refs.hasOwnProperty( target ) ) this.$refs[target].classList.add( 'active' );
            }
        },
        mounted: function ( event ) {
            let children = Array.from( this.$el.querySelectorAll( '.apps-item' ) );

            children.forEach(element => {
                let _header = element.querySelector( '.apps-item-header' );
                _header.style.backgroundImage = 'url(' + _header.dataset.thumb + ')';
            });
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


    // Category
    // ------------------------------------------------------ //
    const _category = new Vue({
        el: '.category',
        methods: {
            change: function ( event ) {
                let target = event.currentTarget;
                let tab = target.dataset.tab;

                _market.switch( tab );

                let children = this.$el.querySelectorAll( 'button' );

                Array.from( children ).forEach(element => {
                    element.classList[element.dataset.tab == tab ? 'add' : 'remove']( 'active' )
                });
            }
        }
    });


    // Preview
    // ------------------------------------------------------ //
    const _preview = new Vue({
        el: '.preview',
        data: {
            name: 'Application name',
            rating: 2,
            preview: 'images/preview/image.png',
            tags: ['work', 'tools'],
            updated: '24 Jan, 2018',
            version: '2.0.1',
            size: '315 MB',
            carousel: null,
            images: ['images/preview/gallery/1.png', 'images/preview/gallery/2.png', 'images/preview/gallery/1.png', 'images/preview/gallery/2.png', 'images/preview/gallery/1.png'],
            introtext: 'Description do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            certificate: ['images/preview/certificate/1.png', 'images/preview/certificate/2.png', 'images/preview/certificate/1.png', 'images/preview/certificate/2.png'],
            description: '<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li><li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul>',
            reviews: [
                {
                    name: 'Clinton Ball',
                    like: 'true',
                    date: '2 min ago',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seduis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proiden'
                },{
                    name: 'Lila	Hudson',
                    like: 'false',
                    date: '24, Jan 2017',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seduis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proiden'
                }
            ]
        },
        methods: {
            next: function () {
                this.carousel.next()          
            },
            prev: function () {
                this.carousel.previous()          
            },
            init: function () {
                this.carousel = new Flickity(this.$refs.carousel, {
                    contain  : true,
                    cellAlign: 'left',
                    pageDots : false,
                    imagesLoaded: true,
                    prevNextButtons: false,
                    friction: .5
                })
            }
        }
    });


    // Disabled Context Menu
    // ------------------------------------------------------ //
    document.addEventListener('contextmenu', event => event.preventDefault());


    // Document Event
    // ------------------------------------------------------ //
    document.addEventListener('click', event => {
        Vue.prototype.$dropdown.hidden();
        _context.show = false;
    });


    // Dropdown Enable
    // ------------------------------------------------------ //
    Vue.prototype.$dropdown.enable()


    // Market
    // ------------------------------------------------------ //
    document.querySelector( '.view-market' ).addEventListener('click', () => {
        _header.$refs.pagetitle.innerHTML = 'Market';
        Vue.prototype.$window( 'market' );
    });

 
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