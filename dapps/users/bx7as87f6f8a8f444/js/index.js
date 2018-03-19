(function () {

    // Create Room
    // API.Room.connect()

    API.Socket.publish('room', 'bx7as87f6f8a8f444')
    API.Http.post('/web', {message_type: 'create', message: {}})

    const avatar = blockies.create({size: 15, scale: 3}).toDataURL()

    const form = document.querySelector( 'form' )
    const message = document.getElementById( 'message' )
    
    form.addEventListener('submit', event => {
        event.preventDefault()

        API.Http.post('/web', {message_type: 'broadcast', message: {message: form.message.value, avatar: avatar}})
    })

    API.Socket.subscribe('message', response => {
        let object = JSON.parse( response )

        let username = document.createElement( 'strong' )
        username.innerHTML = object.username

        let datetime = document.createElement( 'small' )
        datetime.innerHTML = object.datetime
        datetime.classList.add( 'pl-3' )

        let container = document.createElement( 'li' )
        container.classList.add( ... ['media', 'mb-3'] )

        let image = new Image()
        image.src = object.avatar

        image.classList.add( 'avatar' )

        let body = document.createElement( 'div' )
        body.innerHTML = '<p class="mt-2">' + object.message + '</p>'
        body.classList.add( ... ['media-body', 'ml-3'] )

        body.insertBefore(datetime, body.firstChild)
        body.insertBefore(username, body.firstChild)

        container.appendChild( image )
        container.appendChild( body )

        message.appendChild( container )
        window.scrollTo(0, document.body.clientHeight)

        form.message.value = ''
    })
 
})()