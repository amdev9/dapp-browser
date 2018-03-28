;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        let username = form.username;
    
        let notify = form.querySelector( '.alert' );

        API.Http.post('/web', {message_type: 'request', message: {username: username.value}}, response => {
            if ( !response ) return;

            let object = JSON.parse( response );

            username.value = object.message.username;

            notify.classList.remove( 'd-none' );
        })
    });

    API.Http.post('/web', {message_type: 'find'}, response => {
        let object = {}

        try {
            object = JSON.parse( response );
        } catch ( error ) {}

        let array = object.response || [];

        let container = document.querySelector( '.users' );

        if ( !document.contains( container ) ) return;

        let string = document.createElement( 'div' );

        for (let i = 0; i < array.length; i++) {
            let string = document.createElement( 'div' );
            string.innerHTML = array[i].username;

            let button = document.createElement( 'button' );
            button.innerText = 'x';
            
            button.addEventListener('click', () => {
                API.Http.post('/web', {message_type: 'remove', where: {username: array[i].username}}, () => {
                    string.parentNode.removeChild( string );
                });
            });

            string.appendChild( button );
            container.appendChild( string );
        }
    })
})();