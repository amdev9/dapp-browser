// IPFSPubSub SYSTEM CONTROLLER

Events.subscribe('create', function * ( response ) {
	yield IPFSPubSub.create( response )
})

Events.subscribe('broadcast', function * ( response ) {
	yield IPFSPubSub.broadcast( response )
})