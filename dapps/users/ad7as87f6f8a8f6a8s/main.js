// DAPP USER CONTROLLER

Events.subscribe('request', function ( response ) {
	Events.publish(system.WebCtrl, 'frontend_response', response.payload)
})

Events.subscribe('debug', function ( response ) {
	Events.publish(system.LogCtrl, 'debug', response.payload)
})