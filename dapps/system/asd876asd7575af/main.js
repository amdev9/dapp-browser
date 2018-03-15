// WEB SYSTEM CONTROLLER

Events.subscribe('web', function * ( response ) {
    yield EventMap.send(response.from, response.message_type)
    yield Events.publish(response.from, response.message_type, response.payload)
})

Events.subscribe('generate', function * (response) {
    const array  = response.payload.message.empty
    const rand   = Math.floor(Math.random() * (array.length - 1))
    const bounds = array[rand]

    response.payload.message.bounds = bounds
})