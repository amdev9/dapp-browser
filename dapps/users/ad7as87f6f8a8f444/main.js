// DAPP USER CONTROLLER

Events.subscribe('request', function * ( response ) {
	yield Events.publish(system.StrCtrl, 'insert', response.payload);
	yield Events.publish(system.LogCtrl, 'debug', response.payload);
});

Events.subscribe('find', function * ( response ) {
	yield Events.publish(system.StrCtrl, 'find', response.payload);
})

Events.subscribe('remove', function * ( response ) {
	yield Events.publish(system.StrCtrl, 'remove', response.payload);
})

Events.subscribe('update', function * ( response ) {
	yield Events.publish(system.StrCtrl, 'update', response.payload);
})