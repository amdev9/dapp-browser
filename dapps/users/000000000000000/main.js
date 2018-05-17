// DAPP USER CONTROLLER 

Events.subscribe('select', function ( response ) {
	Events.publish(system.SrcCtrl, 'select', response.payload)
})

Events.subscribe('insert', function ( response ) {
	Events.publish(system.SrcCtrl, 'insert', response.payload)
})

Events.subscribe('delete', function ( response ) {
	Events.publish(system.SrcCtrl, 'delete', response.payload)
})

Events.subscribe('destroy', function ( response ) {
	Events.publish(system.SrcCtrl, 'destroy', response.payload)
})