// DAPP USER CONTROLLER

Events.subscribe('find', function ( response ) {
	Events.publish(system.StrCtrl, 'find', response.payload)
})

Events.subscribe('insert', function ( response ) {
	Events.publish(system.StrCtrl, 'insert', response.payload)
})

Events.subscribe('update', function ( response ) {
	Events.publish(system.StrCtrl, 'update', response.payload)
})

Events.subscribe('create', function ( response ) {
	Events.publish(system.IPFSCtrl, 'create', response.payload)
})

Events.subscribe('connect', function ( response ) {
	Events.publish(system.IPFSCtrl, 'connect', response.payload)
})

Events.subscribe('broadcast', function ( response ) {
	Events.publish(system.IPFSCtrl, 'broadcast', response.payload)
})

// Events.subscribe('index', function ( response ) {
// 	Events.publish(system.SrcCtrl, 'insert', response.payload)
// })