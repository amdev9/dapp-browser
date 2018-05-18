;(function () {

    'use strict'

    const upload = document.getElementById( 'upload' )
    const choose = document.getElementById( 'choose' )
    const output = document.getElementById( 'output' )
    const confirm = document.getElementById( 'confirm' )
    const progress = document.getElementById( 'progress' )
    const dragdrop = document.getElementById( 'dragdrop' )


    // Drag And Drop
    document.addEventListener('dragover', function ( event ) {
        event.preventDefault()
        document.body.classList.add( 'dragover' )
    })

    dragdrop.addEventListener('drop', function ( event ) {
        event.preventDefault()
        document.body.classList.remove( 'dragover' )

        const files = event.dataTransfer.files
        const data = new FormData()

        Array.from( files ).forEach(element => data.append('choose', element))

        Uploader( data )
    })

    dragdrop.addEventListener('dragleave', function () {
        event.preventDefault()
        document.body.classList.remove( 'dragover' )
    })


    // Choose File
    choose.addEventListener('change', function () {
        let array = []
        
        for (let i = 0; i < this.files.length; i++) {
            array.push( this.files[i].name )
        }

        let label = this.parentNode.querySelector( 'label' )
        label.innerText = array.join( ', ' )
    })
    

    // Submit Upload Form
    upload.addEventListener('submit', function ( event ) {
        event.preventDefault()

        if ( !this.transfer.value.length ) return
        
        const data = new FormData( this )
        Uploader( data )
    })


    // Upload Method
    const Uploader = function ( data ) {
        const xhr  = new XMLHttpRequest()
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
    }
})();