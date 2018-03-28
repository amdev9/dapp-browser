// DAPP USER CONTROLLER

Events.subscribe('find', function * (response) {
	yield Events.publish(system.StrCtrl, 'find', response.payload)
})

Events.subscribe('insert', function * (response) {
	yield Events.publish(system.StrCtrl, 'insert', response.payload)
})

Events.subscribe('update', function * (response) {
	yield Events.publish(system.StrCtrl, 'update', response.payload)
})

Events.subscribe('create', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'create', response.payload)
})

Events.subscribe('connect', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'connect', response.payload)
})

Events.subscribe('broadcast', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'broadcast', response.payload)
})