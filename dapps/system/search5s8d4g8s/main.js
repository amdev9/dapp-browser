// SEARCH SYSTEM CONTROLLER

Events.subscribe('query', function * (response) {
	yield Search.query( response )
})

Events.subscribe('select', function * (response) {
	yield Search.select( response )
})

Events.subscribe('insert', function * (response) {
	yield Search.insert( response )
})

Events.subscribe('delete', function * (response) {
	yield Search.delete( response )
})

Events.subscribe('destroy', function * (response) {
	yield Search.destroy( response )
})