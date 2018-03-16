// IPFSPubSub SYSTEM CONTROLLER

Events.subscribe('create', function * ( response ) {
	yield IPFSPubSub.create(response.from, response.payload.message)
})

Events.subscribe('broadcast', function * ( response ) {
	yield IPFSPubSub.broadcast(response.from, response.payload.message)
})