// DAPP USER CONTROLLER

Events.subscribe('upload', function * ( response ) {
	yield Events.publish(system.DropCtrl, 'upload', response.payload)
})