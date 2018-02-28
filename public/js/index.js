;(exports => {

    'use strict';

    
    const wrapper = document.querySelector( '.wrapper' );


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
            visible: false
        },
        methods: {
            index: function ( event ) {
                let target = event.currentTarget;
                this.$refs.pagetitle.innerHTML = target.dataset.title;

                _windows.show = null
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
        },
        mounted: function () {
            this.$dropdown.enable( this.$el )
        }
    });


    // Sidebar
    // ------------------------------------------------------ //

    const _aside = new Vue({
        el: 'aside',
        data: {
            view: null,
            drag: null
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

                target.classList.add( 'dragstart' );

                this.drag = this.$createEl('div', null, ['dragover']);
                target.parentNode.insertBefore(this.drag, target);

                let icns = target.querySelector( '.icns' );
                icns.style.top = event.pageY - this.drag.offsetHeight / 2 + 'px';
                icns.style.left = (target.parentNode.clientWidth - icns.clientWidth) / 2 + 'px';
                    
                document.onmousemove = () => this._mousemove( target );
                document.onmouseup   = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;

                    target.classList.remove( 'dragstart' );
                    this.drag.parentNode.replaceChild(target, this.drag);

                    this.drag = null;

                    if ( this.$refs.pins.contains( target ) ) {
                        this.storage = Array.from( this.$refs.pins.children )
                    }
                }
            },
            _mousemove: function ( target ) {
                let icns = target.querySelector( '.icns' );
                icns.style.top = event.pageY - this.drag.offsetHeight / 2 + 'px';

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
                    
                    console.log(array)

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


    // Document Event
    // ------------------------------------------------------ //

    document.addEventListener('click', event => {
        Vue.prototype.$dropdown.hidden();
        _context.show = false;
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