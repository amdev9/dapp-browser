;(function () {
    const form = document.querySelector( 'form' )

    if ( !form ) return

    let num = 0
    
    form.addEventListener('submit', event => {
        event.preventDefault()

        let notify = form.querySelector( '.alert' )

        API.Http.post('/web', {message_type: 'request', message: {value: form.message.value, num: num}}, response => {
            notify.classList.remove( 'd-none' )
            API.Http.post('/web', {message_type: 'debug', message: {value: form.message.value}})
        })
    })
})();