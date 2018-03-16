(function () {

    // Create Room
    API.Http.post('/web', {message_type: 'create', message: {}})

    const form = document.querySelector( 'form' )
    
    form.addEventListener('submit', event => {
        event.preventDefault()
    
        let notify = form.querySelector( '.alert' )

        API.Http.post('/web', {message_type: 'broadcast', message: {username: form.username.value}}, response => {
            notify.classList.remove( 'd-none' )
        })
    })
 
})()