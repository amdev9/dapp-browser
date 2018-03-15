// DAPP USER CONTROLLER

Events.subscribe('broadcast', function * ( response ) {
	yield Events.publish(system.WebCtrl, 'broadcast', response.payload)
})