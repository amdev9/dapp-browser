;(function () {

    'use strict'

    // Var
    const save = document.getElementById( 'save' )
    const clear = document.getElementById( 'clear' )
    const value = document.getElementById( 'value' )
    const url = document.getElementById( 'url' )
    const data = document.getElementById( 'data' )

    const danger = document.querySelector( '.alert-danger' )
    const success = document.querySelector( '.alert-success' )

    function empty () {
        const tbody = data.querySelector( 'tbody' )
        const row = document.createElement( 'tr' )
        const col = document.createElement( 'td' )

        col.setAttribute('colspan', 3)
        col.setAttribute('align', 'center')
        col.innerHTML = 'Empty'

        row.appendChild( col )
        tbody.appendChild( row )
    }

    function update ( array ) {
        const tbody = data.querySelector( 'tbody' )
        tbody.innerHTML = ''

        if ( !array.length ) return empty()

        for (let i = 0; i < array.length; i++) {
            let row = document.createElement( 'tr' )
            
            for (const key in array[i]) {
                let col = document.createElement( 'td' )
                col.innerHTML = array[i][key]

                row.appendChild( col )
            }

            let destroy = document.createElement( 'a' )
            destroy.setAttribute('href', '#')
            destroy.innerHTML = 'Remove'

            destroy.addEventListener('click', function ( event ) {
                event.preventDefault()
                remove.call(this, array[i])
            })

            let action = document.createElement( 'td' )
            action.appendChild( destroy )

            row.appendChild( action )
            tbody.appendChild( row )
        }
    }

    function select () {
        API.Http.post('/web', {message_type: 'select'}, response => {
            try {
                var object = JSON.parse( response )
            } catch ( error ) { return }

            console.log( response )

            update( object.response )
        })
    }

    function remove ( object ) {
        API.Http.post('/web', {message_type: 'delete', message: object}, response => {
            let parent = this.closest( 'tbody' )
            parent.removeChild( this.closest( 'tr' ) )

            if ( !parent.children.length ) empty()
        })
    }

    // Select All Search Params
    select()

    // Save Search Param
    save.addEventListener('click', () => {
        danger.classList.add( 'd-none' )
        success.classList.add( 'd-none' )

        if ( !value.value.trim().length || !url.value.trim().length ) {
            return danger.classList.remove( 'd-none' )
        }

        API.Http.post('/web', {message_type: 'insert', message: {
            value: value.value.trim(),
            url: url.value.trim()
        }}, () => {
            success.classList.remove( 'd-none' )
            select()
        })         
    })

    // Destroy All Search Params Current Application
    clear.addEventListener('click', () => {
        API.Http.post('/web', {message_type: 'destroy'}, () => update( [] ))  
    })
})();