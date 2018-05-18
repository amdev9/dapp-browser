// SEARCH SYSTEM CONTROLLER

Events.subscribe('query', function ( response ) {
	Search.query( response )
})

Events.subscribe('select', function ( response ) {
	Search.select( response )
})

Events.subscribe('insert', function ( response ) {
	Search.insert( response )
})

Events.subscribe('delete', function ( response ) {
	Search.delete( response )
})

Events.subscribe('destroy', function ( response ) {
	Search.destroy( response )
})