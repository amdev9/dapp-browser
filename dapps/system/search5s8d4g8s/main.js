// SEARCH SYSTEM CONTROLLER

Events.subscribe('search', function * (response) {
	yield Search.query( response )
})