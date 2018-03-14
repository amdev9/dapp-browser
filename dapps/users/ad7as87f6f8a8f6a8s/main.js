// DAPP USER CONTROLLER

Events.subscribe('logger', function ( response ) {
	Events.publish(system.LogCtrl, 'info', response.payload)
})

Events.subscribe('logger2', function ( response ) {
	Events.publish(system.LogCtrl, 'debug', response.payload)
})