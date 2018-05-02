// DAPP USER CONTROLLER

Events.subscribe('transfer', function * ( response ) {
	yield Events.publish(system.DropCtrl, 'transfer', response.payload)
})