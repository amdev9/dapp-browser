(function () {

    // Create Room
    // API.Room.connect()

    API.Socket.publish('room', 'bx7as87f6f8a8f444')
    API.Http.post('/web', {message_type: 'create', message: {}})

    const form = document.querySelector( 'form' )
    
    form.addEventListener('submit', event => {
        event.preventDefault()
    
        let notify = form.querySelector( '.alert' )

        API.Http.post('/web', {message_type: 'broadcast', message: {username: form.username.value}}, response => {
            notify.classList.remove( 'd-none' )
        })
    })

    API.Socket.subscribe('message', response => {
        let object = JSON.parse( response )
        alert( object.username )
    })
 
})()