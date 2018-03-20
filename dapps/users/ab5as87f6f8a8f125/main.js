// DAPP USER CONTROLLER

Events.subscribe('create', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'create', response.payload)
})