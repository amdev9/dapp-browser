// SEARCH SYSTEM CONTROLLER

Events.subscribe('select', function * (response) {
	yield Search.query( response )
})

Events.subscribe('insert', function * (response) {
	yield Search.insert( response )
})