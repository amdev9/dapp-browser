// MARKET PLACE SYSTEM CONTROLLER

Events.subscribe('getall', function * (response) {
	yield Network.getJson( response );
});