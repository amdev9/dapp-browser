// IPFSPubSub SYSTEM CONTROLLER

Events.subscribe('create', function ( response ) {
	IPFSPubSub.create( response )
})

Events.subscribe('connect', function ( response ) {
	IPFSPubSub.connect( response )
})

Events.subscribe('broadcast', function ( response ) {
	IPFSPubSub.broadcast( response )
})