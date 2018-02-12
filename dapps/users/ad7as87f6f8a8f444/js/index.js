;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        var username = form.username;
    
        var notify = form.querySelector( '.alert' );

        API.Http.post('/web', {message_type: 'request', message: {username: username.value}}, function ( response ) {
            if ( !response ) return;

            let object = JSON.parse( response );

            username.value = object.message.username;

            notify.classList.remove( 'd-none' );
        })
    });

    API.Http.post('/storage', {message_type: 'find', message: {}}, function ( response ) {
        let object = JSON.parse( response );
        
        let container = document.querySelector( '.users' );

        if ( !document.contains( container ) ) return;

        let string = document.createElement( 'div' );

        for (let i = 0; i < object.docs.length; i++) {
            let string = document.createElement( 'div' );
            string.innerHTML = object.docs[i].username;

            let button = document.createElement( 'button' );
            button.innerText = 'x';
            
            button.addEventListener('click', () => {
                API.Http.post('/storage', {message_type: 'remove', message: {username: object.docs[i].username}}, () => {
                    string.parentNode.removeChild( string );
                    console.log('remove')
                });
            });

            string.appendChild( button );
            container.appendChild( string );
        }
    })
})();