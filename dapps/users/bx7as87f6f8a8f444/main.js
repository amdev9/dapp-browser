// DAPP USER CONTROLLER

Events.subscribe('create', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'create', response.payload)
})

Events.subscribe('broadcast', function * ( response ) {
	yield Events.publish(system.IPFSCtrl, 'broadcast', response.payload)
})

// Events.subscribe('ipfs_read', function * ( response ) {
// 	yield Events.publish(system.WebCtrl, 'request', response.payload)
// })