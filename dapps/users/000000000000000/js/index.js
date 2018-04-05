;(function () {

    'use strict'

    const open = document.getElementById( 'open' )
    const data = document.getElementById( 'data' )
    const params = document.getElementById( 'params' )

    // Location
    open.addEventListener('click', function ( event ) {
        event.preventDefault()

        let href = this.getAttribute( 'href' )
        let url = href + '?' + params.value

        location.href = url
    })

    // DOM conent loaded
    data.innerHTML = window.argv ? JSON.stringify( window.argv ) : '{}'

    console.log( window.argv )

    // Focus window event
    window.addEventListener('message', event => data.innerHTML = JSON.stringify( event.data ))

})();