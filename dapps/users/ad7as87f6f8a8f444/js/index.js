;(function () {
    const form = document.querySelector( 'form' );

    if ( !form ) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        var username = form.username;
        var password = form.password;
    
        var notify = form.querySelector( '.alert' );

        var XMLHttp = new XMLHttpRequest();

        XMLHttp.open('POST', '/web');
        XMLHttp.setRequestHeader('Content-Type', 'application/json');

        XMLHttp.onreadystatechange = function() {
            if ( this.readyState == 4 && this.status == 200 ) {
                if ( !this.response ) return;

                let object = JSON.parse( this.response );

                username.value = object.message.form.username;
                password.value = object.message.form.password;

                notify.classList.remove( 'd-none' );
            }
        }

        XMLHttp.send(JSON.stringify({message_type: 'webreq', message: {
            form: {
                username: username.value,
                password: password.value
            }
        }}));
    });
    
})();