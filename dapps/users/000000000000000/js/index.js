;(function () {

    'use strict'

    // Request
    const request = 'arr://demo:mainet/'

    // Var
    const open = document.getElementById( 'open' )
    const code = document.getElementById( 'code' )
    const route = document.getElementById( 'route' )
    const params = document.getElementById( 'params' )

    // Reopen With Params
    open.addEventListener('click', function ( event ) {
        location.href = request + '?' + params.value
    })

    // Event Post Message
    window.addEventListener('message', event => {
        code.innerHTML = JSON.stringify( event.data )
    })

})();