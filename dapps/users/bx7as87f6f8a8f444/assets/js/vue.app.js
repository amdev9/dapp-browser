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
        methods: {
            getroom ( object ) {
                if ( !object || !object.room ) return

                for (const key in this.rooms) {
                    if ( object.room.toLowerCase() == this.rooms[key].name.toLowerCase() ) {
                        this.target = this.rooms[key].key
                        this.current = this.rooms[this.target]

                        API.Room.connect( this.target )

                        this.$nextTick(function () {
                            let container = document.getElementById( 'overflow' )
                            container.scrollTop = container.scrollHeight
                        })

                        break
                    }    
                }
            }
        },
        mounted () {
            this.$nextTick(async function () {
                const rooms = await new Promise(resolve => {
                    API.Http.post('/web', {message_type: 'find', where: {type: 'room'}}, response => {
                        const object = JSON.parse( response )
                        const rooms = Object.assign({}, this.rooms)
                        
                        for (let i = 0; i < object.response.length; i++) {
                            object.response[i].messages = []
                            rooms[object.response[i].key] = object.response[i]
                        }

                        resolve( rooms )
                    })
                })

                const messages = await new Promise(resolve => {
                    API.Http.post('/web', {message_type: 'find', where: {type: 'message'}}, response => {
                        const object = JSON.parse( response )
                        const output = object.response.sort((a, b) => a.time - b.time)

                        resolve( output )
                    })
                })

                for (const key in rooms) {
                    for (let i = 0; i < messages.length; i++) {
                        if ( key == messages[i].key ) rooms[key].messages.push( messages[i] )
                    }

                    const array = rooms[key].messages
                    const value = array[array.length - 1]
                    
                    rooms[key].introtext = value ? value.content : '----'
                }

                this.rooms = rooms
    
                API.Room.message(response => {
                    const object = JSON.parse( response )

                    object.type = 'message'
                    object.time = Date.now()
                    object.from = object.unic != this.unic

                    delete object.unic
                    
                    this.current.introtext = object.content
                    this.$root.current.messages.push( object )
                    
                    API.Http.post('/web', {message_type: 'insert', message: object})
                })
    
                window.addEventListener('message', event => {
                    this.getroom( event.data )
                })
            })
        }
    })
})();