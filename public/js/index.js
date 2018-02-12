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
        el: 'aside .contextmenu',
        data: {
            show: false,
            target: null
        },
        methods: {
            pin: function () {
                alert( 'pin' )
            },
            close: function () {
                let view = _windows.$el.querySelector( '#' + this.target );
                view.parentNode.removeChild( view );

                let item = _aside.$el.querySelector( '[data-key = ' + this.target + ']' );
                item.parentNode.removeChild( item );
                
                if ( _windows.key == this.target ) _windows.show = null;
            }
        },
        watch: {
            show: function ( value ) {
                if ( value === true ) return;

                [].forEach.call(_aside.$el.children, element => element.classList.remove( 'focus' ))
            }
        }
    });


    // Header
    // ------------------------------------------------------ //

    const _header = new Vue({
        el: 'header',
        methods: {
            close: function () {
                _windows.show = null
            }
        }
    });


    // Sidebar
    // ------------------------------------------------------ //

    const _aside = new Vue({
        el: 'aside .apps',
        data: {
            view: null
        },
        methods: {
            renderer: function ( value ) {
                [].forEach.call(this.$el.children, element => element.classList.remove( 'active' ));

                let target = this.$el.querySelector( '[data-key = ' + this.key + ']' );
                
                if ( !this.$el.contains( target ) ) {
                    this.view.classList.add( 'active' );
                    this.$el.appendChild( this.view );
                } else {
                    target.classList.add( 'active' );
                    target.classList.remove( 'd-none' );
                }
            }
        },
        computed: {
            create: {
                set: function ( options ) {
                    let element = this.$createEl('div', null, ['apps-item']);
                    element.dataset['key'] = options.key

                    let icns  = this.$createEl('div', null, ['icns']);
                    let image = this.$createEl('img', {src: options.icon});

                    icns.appendChild( image );
                    element.appendChild( icns );

                    element.addEventListener('click', event => {
                        [].forEach.call(this.$el.children, element => element.classList.remove( 'active' ));
                        event.currentTarget.classList.add( 'active' );

                        _windows.create = {key: options.key, src: null};
                    });

                    element.addEventListener('contextmenu', event => {
                        let bounds = {x: event.clientX, y: event.clientY}
                        let offset = element.clientHeight;
                        let key = element.dataset.key;

                        [].forEach.call(this.$el.children, element => element.classList.remove( 'focus' ));
                        element.classList.add( 'focus' );

                        _context.$el.style.left = bounds.x + 'px';
                        _context.$el.style.top  = bounds.y - offset + 'px';

                        _context.target = key;
                        _context.show = true;
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
                    this.view.onload = this.onload();
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
                [].forEach.call(_aside.$el.children, element => element.classList.remove( ... ['active', 'focus']));
            }
        }
    });


    // Applications
    // ------------------------------------------------------ //

    const _apps = new Vue({
        el: '.content .apps',
        methods: {
            view: function ( event ) {
                let target = event.currentTarget;
                let icon = target.dataset.icon;
                let src  = target.dataset.src;
                let key  = this._replace( src );

                _windows.create = {key: key, src: src};
                _aside.create = {key: key, icon: icon};
            },
            _replace: function ( string ) {
                return string.replace('users/', '').split( '/' ).shift();
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