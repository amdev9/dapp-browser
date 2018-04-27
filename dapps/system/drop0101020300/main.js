// DROP SYSTEM CONTROLLER

Events.subscribe('upload', function * (response) {
	yield Dropbox.upload( response )
})