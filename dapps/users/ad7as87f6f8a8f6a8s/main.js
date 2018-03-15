// DAPP USER CONTROLLER

Events.subscribe('info', function * ( response ) {
	yield Events.publish(system.LogCtrl, 'info', response.payload)
})

Events.subscribe('debug', function * ( response ) {
	yield Events.publish(system.LogCtrl, 'debug', response.payload)
})