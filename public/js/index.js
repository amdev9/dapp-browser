;(exports => {

    'use strict';


    // Console
    // ------------------------------------------------------ //

    const _console = new Vue({
        el: '.view-code',
        data: {
            open: false
        },
        methods: {
            toogle: function () {
                this.open = !this.open;
                this.$refs.console.scrollTop = this.$refs.console.scrollHeight;
            }
        },
        computed: {
            content: {
                set: function ( value ) {
                    let string = this.$createEl( 'p' );
                    string.innerHTML = value;

                    this.$refs.console.appendChild( string );
                    this.$refs.console.scrollTop = this.$refs.console.scrollHeight;
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
                    let object = JSON.parse( response );

                    let pins = _aside.$refs.pins;
                    let apps = _aside.$refs.apps;

                    let item = _aside.$el.querySelector( '[data-key = ' + this.target + ']' );
 
                    (() => object.status ? pins : apps)().appendChild( item )
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
            visible: false
        },
        methods: {
            index: function ( event ) {
                let target = event.currentTarget;
                this.$refs.pagetitle.innerHTML = target.dataset.title;

                _windows.show = null
            },
            search: function ( event ) {
                let target = event.currentTarget;

                this.visible = !this.visible;

                let children = Array.from( target.children );
                children.forEach(element => element.classList.toggle( 'visible' ));

                if ( !this.visible ) this.$refs.search.value = '';
            },
            settings: function () {

            },
            notify: function () {
                
            }
        }
    });


    // Sidebar
    // ------------------------------------------------------ //

    const _aside = new Vue({
        el: 'aside',
        data: {
            view: null
        },
        methods: {
            renderer: function ( value ) {
                let children = this.$concat([this.$refs.apps.children, this.$refs.pins.children])
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
            }
        },
        mounted: function () {
            let children = Array.from( this.$refs.pins.children );

            children.forEach(element => {
                let options = Object.assign({}, element.dataset);

                let icns  = this.$createEl('div', null, ['icns']);
                let image = this.$createEl('img', {src: options.icon});

                icns.appendChild( image );
                element.appendChild( icns );

                element.addEventListener('click', event => {
                    this._click(event, options)
                });

                element.addEventListener('contextmenu', event => {
                    this._context(event, options)
                });
            })
        },
        computed: {
            create: {
                set: function ( options ) {
                    let element = this.$createEl('div', null, ['apps-item']);

                    for (const key in options) {
                        element.dataset[key] = options[key]
                    }
                
                    let icns  = this.$createEl('div', null, ['icns']);
                    let image = this.$createEl('img', {src: options.icon});

                    icns.appendChild( image );
                    element.appendChild( icns );

                    element.addEventListener('click', event => {
                        this._click(event, options)
                    });

                    element.addEventListener('contextmenu', event => {
                        this._context(event, options)
                    });

                    this.view = element;
                    this.key  = options.key;

                    this.renderer();
                }
            }
        }
    });


    // Windows
    // ------------------------------------------------------ //

    const _windows = new Vue({
        el: '#views',
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
                if ( value === true ) return;

                this.$hideEls( this.$el.children );

                let children = this.$concat([_aside.$refs.apps.children, _aside.$refs.pins.children])
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


    // Disabled Context Menu
    // ------------------------------------------------------ //

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('click', event => _context.show = false);


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