;(function () {

    'use strict'

    const create = document.querySelector( 'form[name = create]' )
    const contacts = document.getElementById( 'contacts' )

    const createString = ( data ) => {
        let string = document.createElement( 'li' )
        string.innerHTML = data.username + ' : ' + data.email + ' : ' + data.key

        return string
    }

    API.Http.post('/web', {message_type: 'find'}, response => {
        let object = JSON.parse( response )
        let data = object.response

        if ( !data.length ) return

        data.forEach(obj => {
            contacts.appendChild( createString( obj ) )
        })
    })

    create.addEventListener('submit', function ( event ) {
        event.preventDefault()

        let username = this.username
        let email = this.email
        let key = this.key

        API.Http.post('/web', {message_type: 'insert', message: {
            username: username.value,
            email: email.value,
            key: key.value
        }}, response => {
            let object = JSON.parse( response )
            let data = object.response

            contacts.appendChild( createString( data ) )
        })
    })

})();