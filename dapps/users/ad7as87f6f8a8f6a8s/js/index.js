;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();

        let notify = form.querySelector( '.alert' );

        API.Http.post('/web', {message_type: 'logger', message: {value: 1}}, response => {
            // notify.classList.remove( 'd-none' );
            console.log(response)
        })

        API.Http.post('/web', {message_type: 'logger2', message: {value: 2}}, response => {
            // notify.classList.remove( 'd-none' );
            console.log(response)
        })
    });
})();