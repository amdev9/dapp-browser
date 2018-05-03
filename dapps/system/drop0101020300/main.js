// DROP SYSTEM CONTROLLER

Events.subscribe('transfer', function * (response) {
	yield Dropbox.transfer( response )
})