// MARKET PLACE SYSTEM CONTROLLER

Events.subscribe('market', function * (response) {
	yield Network.getJson( response )
})