;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        var textarea = form.message.value;
        var notify = form.querySelector( '.alert' );

        API.Http.post('/web', {message_type: 'test', message: {value: textarea}}, function ( response ) {
            if ( !response ) return;

            notify.classList.remove( 'd-none' );
        })
    });
})();