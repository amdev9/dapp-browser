// DAPP USER CONTROLLER

Events.subscribe('bot', function * ( response ) {
	yield Events.publish(system.WebCtrl, 'generate', response.payload);
	yield Events.publish(system.LogCtrl, 'info', response.payload);
});