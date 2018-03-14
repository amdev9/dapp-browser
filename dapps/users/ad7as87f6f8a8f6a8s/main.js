// DAPP USER CONTROLLER

Events.subscribe('logger', function * ( response ) {
	yield Events.publish(system.LogCtrl, 'info', response.payload);
});