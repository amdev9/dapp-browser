;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        var username = form.username;
    
        var notify = form.querySelector( '.alert' );

        var XMLHttp = new XMLHttpRequest();

        XMLHttp.open('POST', '/web');
        XMLHttp.setRequestHeader('Content-Type', 'application/json');

        XMLHttp.onreadystatechange = function() {
            if ( this.readyState == 4 && this.status == 200 ) {
                if ( !this.response ) return;

                let object = JSON.parse( this.response );

                username.value = object.message.username;

                notify.classList.remove( 'd-none' );
            }
        }

        XMLHttp.send(JSON.stringify({message_type: 'webreq', message: {
            username: username.value
        }}));
    });

    const renderUsers = ( response ) => {
        let container = document.querySelector( '.users' );

        if ( !document.contains( container ) ) return;

        let string = document.createElement( 'div' );

        for (let i = 0; i < response.length; i++) {
            let string = document.createElement( 'div' );
            string.innerHTML = response[i].username;
            container.appendChild( string );
        }
    }

    API.Socket.subscribe('insert', ( response ) => {
        console.log( 'Ok!' )
    })

    API.Socket.connect('find', ( response ) => {
        console.log(response )
        let container = document.querySelector( '.users' );

        if ( !document.contains( container ) ) return;

        let string = document.createElement( 'div' );

        for (let i = 0; i < response.length; i++) {
            let string = document.createElement( 'div' );
            string.innerHTML = response[i].username;
            container.appendChild( string );
        }
    });
    
})();