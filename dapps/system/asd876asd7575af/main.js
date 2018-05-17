// WEB SYSTEM CONTROLLER

Events.subscribe('web', function ( response ) {
    Events.publish(response.from, response.message_type, response.payload)
})

Events.subscribe('generate', function ( response ) {
    const array  = response.payload.message.empty
    const rand   = Math.floor(Math.random() * (array.length - 1))
    const bounds = array[rand]

    response.payload.message.bounds = bounds
})

Events.subscribe('frontend_response', function ( response ) {
    FrontEnd.complete( response.payload )
})

Events.subscribe('broadcast', function ( response ) {
    Connect.broadcast( response.payload )
})

Events.subscribe('joined', function ( response ) {
    Connect.joined( response.payload )
})

Events.subscribe('detached', function ( response ) {
    Connect.detached( response.payload )
})