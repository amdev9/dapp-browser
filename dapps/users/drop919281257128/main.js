// DAPP USER CONTROLLER

Events.subscribe('transfer', function ( response ) {
	Events.publish(system.DropCtrl, 'transfer', response.payload)
})