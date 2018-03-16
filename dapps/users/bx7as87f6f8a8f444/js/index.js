(function () {

    // Create Room
    // API.Room.connect()

    API.Socket.publish('room', 'bx7as87f6f8a8f444')
    API.Http.post('/web', {message_type: 'create', message: {}})

    const form = document.querySelector( 'form' )
    const message = document.getElementById( 'message' )
    
    form.addEventListener('submit', event => {
        event.preventDefault()

        API.Http.post('/web', {message_type: 'broadcast', message: {message: form.message.value}})
    })

    API.Socket.subscribe('message', response => {
        let object = JSON.parse( response )
        let string = document.createElement( 'p' )
        string.innerHTML = object.message
        
        message.appendChild( string )
        window.scrollTo(0, document.body.clientHeight)
    })
 
})()