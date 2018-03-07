;(selector => {

    const init = () => {
        const images = document.querySelectorAll( selector );
        const reader = new FileReader();

        let index  = 0;
    
        if ( !images.length ) return;
    
        const createElement = data => {
            let temp = document.createElement( 'div' );
            temp.innerHTML = data;
    
            if ( temp.children.length ) return temp.children[0];
    
            return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        }
    
        const readDataFile = image => {
            let id = image.id.trim();
            let classes = image.className.replace(/\s+/g,' ').trim();
    
            let array = image.src.split( '.' );
            let type  = array[array.length - 1];
    
            if ( type != 'svg' ) {
                index++;
                
                if ( index < images.length ) { readDataFile( images[index] ) }
    
                return;
            }
    
            XMLRequest(image.src, function ( data ) {
                let element = createElement( data );
    
                if ( id.length ) element.setAttribute('id', id);
                if ( classes.length ) element.setAttribute('class', classes);
    
                element.removeAttribute( 'xmlns:a' );
                image.parentNode.replaceChild(element, image);
    
                index++;
    
                if ( index < images.length ) { readDataFile( images[index] ) }
            })
        }
        
        const XMLRequest = (src, callback) => {
            let xmlhttp = new XMLHttpRequest();
            
            xmlhttp.onreadystatechange = function() {
                if ( this.readyState == 4 ) {
                    callback( this.status == 200 ? this.response : '' )
                }
            }
    
            xmlhttp.open('GET', src, true);
            xmlhttp.send();
        }
    
        readDataFile( images[index] );
    }

    document.addEventListener('DOMContentLoaded', init)

})( '.svg' );