// DROP SYSTEM CONTROLLER

Events.subscribe('transfer', function ( response ) {
	Dropbox.transfer( response )
})