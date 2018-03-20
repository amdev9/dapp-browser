;(function () {

    // Forms
    const create = document.querySelector( 'form[name = create]' )
    const connect = document.querySelector( 'form[name = connect]' )
    const broadcast = document.querySelector( 'form[name = broadcast]' )

    // Avatar
    const avatar = blockies.create({size: 15, scale: 3}).toDataURL()

    // Ready Room
    const ready = () => {
        let view = document.querySelector( '.ready' )
        view.classList.add( 'd-none' )
        broadcast.classList.remove( 'd-none' )
    }

    // Render Message
    const renderer = response => {
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
    }

    // Create
    create.addEventListener('submit', function ( event ) {
        event.preventDefault()
        API.Room[this.name](this.message.value, ready)
    })

    // Connect
    connect.addEventListener('submit', function ( event ) {
        event.preventDefault()
        API.Room[this.name](this.message.value, ready)
    })

    // Broadcast
    broadcast.addEventListener('submit', function ( event ) {
        event.preventDefault()
        API.Room[this.name]({message: this.message.value, avatar: avatar}, () => this.message.value = '')
    })

    // Get Message From Room
    API.Room.message( renderer )
})();