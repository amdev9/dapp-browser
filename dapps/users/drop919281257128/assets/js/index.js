;(function () {

    'use strict'

    const upload = document.getElementById( 'upload' )
    const choose = document.getElementById( 'choose' )
    const output = document.getElementById( 'output' )
    const confirm = document.getElementById( 'confirm' )
    const progress = document.getElementById( 'progress' )

    choose.addEventListener('change', function () {
        let array = []
        
        for (let i = 0; i < this.files.length; i++) {
            array.push( this.files[i].name )
        }

        let label = this.parentNode.querySelector( 'label' )
        label.innerText = array.join( ', ' )
    })
    
    upload.addEventListener('submit', function ( event ) {
        event.preventDefault()

        output.innerHTML = ''

        let data = new FormData( this )
        let xhr  = new XMLHttpRequest()
    
        xhr.open('post', '/transfer')

        xhr.upload.addEventListener('progress', function ( event ) {
			var score = parseInt(event.loaded / event.total * 100)
            progress.value = score
        })
        
        xhr.onreadystatechange = function () {
            if ( this.readyState == 4 && this.status == 200 ) {
                let object = JSON.parse( this.response )

                API.Http.post('/web', {message_type: 'transfer', message: object.data}, response => {
                    let object = JSON.parse( response )
                    
                    for (let i = 0; i < object.response.length; i++) {
                        let body = document.createElement( 'div' )
                        let link = document.createElement( 'a' )

                        link.href = object.response[i]
                        link.innerHTML = object.response[i]
                        link.target = '_blank'

                        body.appendChild( link )
                        output.appendChild( body )
                    }

                    confirm.classList.remove( 'd-none' )
                    progress.value = 0
                })
            }
        }

        xhr.send( data )
    })
})();