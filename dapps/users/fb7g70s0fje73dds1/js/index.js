;(function () {

    'use strict'

    const sign = document.querySelector( 'form[name = sign]' )
    const results = document.getElementById( 'results' )

    const createString = ( data ) => {
        let string = document.createElement( 'tr' )
        string.innerHTML = `
            <td>${data.id}</td><td>${data.result}</td>
            `
        return string
    }

    sign.addEventListener('submit', function ( event ) {
        event.preventDefault()

        let chainid = this.chainid
        let transaction = this.transaction
        let keyname = this.keyname

        API.Http.post('/web', {message_type: 'sign', message: {
            chainid: chainid.value,
            transaction: transaction.value,
            keyname: keyname.value
        }}, response => {
            let object = JSON.parse( response )
            let data = object.response
            results.appendChild( createString(data) )
        })
    })

})();