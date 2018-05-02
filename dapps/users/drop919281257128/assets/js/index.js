;(function () {

    'use strict'

    const upload = document.getElementById( 'upload' )
    const choose = document.getElementById( 'choose' )
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

        let data = new FormData( this )
        let xhr  = new XMLHttpRequest()
    
        xhr.open('post', '/transfer')

        xhr.upload.addEventListener('progress', function ( event ) {
			var score = parseInt(event.loaded / event.total * 100)
            progress.value = score
        })
        
        xhr.onreadystatechange = function () {
            if ( this.readyState == 4 && this.status == 200 ) {
                progress.value = 0
                confirm.classList.remove( 'd-none' )
            }
        }

        xhr.send( data )
    })
})();