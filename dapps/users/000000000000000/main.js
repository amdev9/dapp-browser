// DAPP USER CONTROLLER 

Events.subscribe('select', function * ( response ) {
	yield Events.publish(system.SrcCtrl, 'select', response.payload)
})

Events.subscribe('insert', function * ( response ) {
	yield Events.publish(system.SrcCtrl, 'insert', response.payload)
})

Events.subscribe('delete', function * ( response ) {
	yield Events.publish(system.SrcCtrl, 'delete', response.payload)
})

Events.subscribe('destroy', function * ( response ) {
	yield Events.publish(system.SrcCtrl, 'destroy', response.payload)
})