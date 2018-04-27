;(function () {

    'use strict'

    const upload = document.getElementById( 'upload' )

    upload.addEventListener('submit', function ( event ) {
        event.preventDefault()
        
        API.Http.post('/web', {message_type: 'upload', message: {path: this.choose.value}}, () => {
            alert( 'ok' )
        })
    })
})();