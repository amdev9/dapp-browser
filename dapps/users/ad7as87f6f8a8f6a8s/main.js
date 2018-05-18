// DAPP USER CONTROLLER

Events.subscribe('request', function ( response ) {
	Events.publish(system.WebCtrl, 'frontend_response', response.payload)
})

Events.subscribe('debug', function ( response ) {
	Events.publish(system.LogCtrl, 'debug', response.payload)
})

Events.subscribe('connect', function ( response ) {
	Events.publish(system.StatCtrl, 'connect', response.payload)
})