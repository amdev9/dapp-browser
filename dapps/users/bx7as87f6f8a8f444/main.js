// DAPP USER CONTROLLER

Events.subscribe('create', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'create', response.payload)
})

Events.subscribe('connect', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'connect', response.payload)
})

Events.subscribe('broadcast', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'broadcast', response.payload)
})