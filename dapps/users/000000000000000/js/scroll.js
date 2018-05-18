;(function () {

    'use strict'

    // Request
    const request = 'arr://demo:mainet/'

    // Var
    const items = document.querySelectorAll( '.group .item' )
    const scroll = document.getElementById( 'scroll' )
    const code = document.getElementById( 'code' )

    // Scroll To
    function scrollToTop ( target ) {
        let section = document.getElementById( target )

        if ( !section ) return

        window.scrollTo(0, section.offsetTop - 15)
    }

    // Navigation
    items.forEach(element => {
        element.addEventListener('click', function () {
            scrollToTop( this.dataset.href )
        })
    })

    // Scroll With Params
    scroll.addEventListener('click', () => {
        location.href = request + '?href=two'
    })

    // Event Post Message
    window.addEventListener('message', event => {
        code.innerHTML = JSON.stringify( event.data )
        scrollToTop( event.data.href )
    })

})();