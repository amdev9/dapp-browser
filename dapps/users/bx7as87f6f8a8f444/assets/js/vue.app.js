;(function () {

    'use strict'

    const strRand = function ( count = 30 ) {
        let result = String()
        let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
        let max = words.length - 1
    
        while ( count > 0 ) {
            let position = Math.floor( Math.random() * max )
            result += words.substring(position, position + 1)
            count--
        }
    
        return result
    }

    new Vue({
        el: '#app',
        data: {
            unic: strRand(),
            rooms: {},
            target: null,
            current: {},
        },
        mounted () {
            API.Http.post('/web', {message_type: 'find', message: {}}, response => {
                let object = JSON.parse( response )
                let rooms = Object.assign({}, this.rooms)
                
                for (let i = 0; i < object.response.length; i++) {
                    rooms[object.response[i].key] = object.response[i]
                }

                this.rooms = rooms
            })

            API.Room.message(response => {
                let object = JSON.parse( response )
                let message = object.message
                
                message.from = message.unic != this.unic 
                message.datetime = object.datetime
                message.username = object.username

                this.current.messages.push( message )
            })
        }
    })

})();