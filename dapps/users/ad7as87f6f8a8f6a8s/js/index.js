;(function () {
    const form = document.querySelector( 'form' )

    if ( !form ) return
    
    form.addEventListener('submit', event => {
        event.preventDefault()

        let notify = form.querySelector( '.alert' )

        API.Http.post('/web', {message_type: 'info', message: {value: form.message.value}}, response => {
            notify.classList.remove( 'd-none' )
        })

        API.Http.post('/web', {message_type: 'debug', message: {value: form.message.value}}, response => {
            notify.classList.remove( 'd-none' )
        })
    })
})();