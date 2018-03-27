;(function () {

    'use strict'

    new Vue({
        el: '#app',
        data: {
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

                this.current.messages.push({
                    from: true,
                    username: object.username,
                    content: object.message
                })
            })
        }
    })

})();