;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        var textarea = form.message.value;
        var notify = form.querySelector( '.alert' );

        var XMLHttp = new XMLHttpRequest();

        XMLHttp.open('POST', '/web');
        XMLHttp.setRequestHeader('Content-Type', 'application/json');

        XMLHttp.onreadystatechange = function() {
            if ( this.readyState == 4 && this.status == 200 ) {
                if ( !this.response ) return;

                notify.classList.remove( 'd-none' );
            }
        }

        XMLHttp.send(JSON.stringify({message_type: 'test', message: {
            value: textarea
        }}));
    });
    
})();