;(exports => {

    'use strict';

    // Vue Options
    Vue.options.delimiters = ['${', '}'];

    // ВСЕ ДАННЫЕ ПЕРЕНОСИТЬ ЧЕРЕЗ localStorage !!!

    // 
    new Vue({
        el: '.content .apps',
        data: {
            test: 'test'
        },
        methods: {
            demo: function () {
               
            }
        }
    });



    // -------------------------------------------------------------------------------------------------------------- //

    // Nodes
    const viewer  = document.querySelector( '.view-code-console' );
    const header  = document.querySelector( 'header' );
    const sidebar = document.querySelector( 'aside' );
    const frames  = document.querySelector( '.frames' );

    const disableContextMenu = event => {
        event.preventDefault()
    }

    const hiddenContextMenu = event => {
        $( 'aside .apps .apps-item' ).removeClass( 'focus' );
        $( '.contextmenu' ).removeAttr( 'data-key' ).hide();
    }

    // Disabled Context Menu
    $( document ).on('contextmenu', disableContextMenu);


    // Close All Context Menu
    $( document ).on('click', hiddenContextMenu);


    // Context Menu Event
    $( document ).on('click', '.contextmenu span', function () {
        let value = $( this ).data( 'value' );
        let key = this.parentNode.getAttribute( 'data-key' );
        let target = $( 'iframe#' + key );
         
        if ( value === 'close' ) {
            target.remove();

            $('.apps-item[data-key = ' + key + ']', sidebar).remove();
            if ( target.hasClass( 'active' ) ) $( frames ).removeClass( 'view' );
        }
    });


    // Context Menu Open App
    $( document ).on('contextmenu', 'aside .apps .apps-item', function ( event ) {
        let x = event.clientX;
        let y = event.clientY;

        let offset = $( this ).outerHeight();
        let key = $( this ).data( 'key' );

        $( 'aside .apps .apps-item' ).removeClass( 'focus' );
        $( this ).addClass( 'focus' );

        $('.contextmenu', sidebar).css({left: x, top: y - offset}).attr('data-key', key).show()
    });


    // Open/Close Console
    $( document ).on('click', '.view-code-panel', function () {
        $( viewer ).toggleClass( 'open' );
        viewer.scrollTop = viewer.scrollHeight;
    });


    // Home Page
    $( document ).on('click', '.navbar-home-link', function () {
        $('iframe', frames).addClass( 'd-none' );
        $( frames ).removeClass( 'view' );

        $('.apps .apps-item', sidebar).removeClass( 'active' );
    });


    // View App
    $( document ).on('click', '.content .apps .apps-item', function () {
        let href = $( this ).data( 'href' );
        let icon = $( this ).data( 'icon' );
        let type = $( this ).data( 'type' );
        let key  = href.replace('users/', '').split( '/' ).shift();

        let target = $( 'iframe#' + key );
        let panel = $( '.' + type, sidebar );

        $('.apps .apps-item', sidebar).removeClass( 'active' );
        $( '#access' ).attr('data-target', key);

        if ( target.length ) {
            $('iframe', frames).removeClass( 'active' ).addClass( 'd-none' );
            target.addClass( 'active' ).removeClass( 'd-none' );
            
            $('.apps-item[data-key = ' + key + ']', sidebar).addClass( 'active' );
        } else {
            let iframe = document.createElement( 'iframe' );
            $( iframe ).addClass( 'active' ).attr({id : key, src: href});
            
            let item  = $( '<div/>' ).addClass( 'apps-item active' ).attr('data-key', key);
            let icns  = $( '<div/>' ).addClass( 'icns' );
            let image = $( '<img/>' ).attr('src', icon); 
 
            panel.append( item.append( icns.append( image ) ) );

            frames.append( iframe );

            $( iframe ).on('load', function () {
                let head = $('head', this.contentWindow.document);

                $( '<script/>' ).attr('src', '/module/socket.io.js').appendTo( head );
                $( '<script/>' ).attr('src', '/module/lib.js').appendTo( head );

                $( this.contentWindow.document ).on('contextmenu', disableContextMenu);
                $( this.contentWindow.document ).on('click', hiddenContextMenu);
            });
        }

        $( frames ).addClass( 'view' );
    });


    // Select App
    $( document ).on('click', 'aside .apps .apps-item', function ( event ) {
        let key = $( this ).data( 'key' );

        $( '#access' ).attr('data-target', key);
        $('.apps .apps-item', sidebar).removeClass( 'active' );
        $( this ).addClass( 'active' );

        $( frames ).addClass( 'view' );
        $('iframe', frames).removeClass( 'active' ).addClass( 'd-none' );
        $('iframe#' + key, frames).addClass( 'active' ).removeClass( 'd-none' );
    });


    // Update Permissions
    $( '#access .accept' ).on('click', function () {
        let target = $( '#access' ).attr( 'data-target' );

        $.post('/access', {target: target}, function ( response ) {
            if ( response.status == true ) $( '#access' ).modal( 'hide' );
        })
    });


    // Console
    API.Socket.subscribe('console', response => {
        let string = $( '<p/>' );
        string.html( response.time + ' : ' + response.target + ' : <span class="' + response.type.toLowerCase() + '">' + response.type + '</span> : ' + JSON.stringify( response.message ) );

        $( viewer ).append( string );
        viewer.scrollTop = viewer.scrollHeight;
    });

    // Access
    API.Socket.subscribe('access', response => {
        console.log('ok')

        $( '#access' ).on('show.bs.modal', function () {
            let message = response.message;
            let rows = response.rows;

            for (let i = 0; i < rows.length; i++) {
                rows[i] = '<b>' + rows[i] +'</b>'
            }

            $('.modal-body', this).html('<p>' + message +'</p>' + rows.join( ', ' ))
        }).modal( 'show' );
    })
})( this );