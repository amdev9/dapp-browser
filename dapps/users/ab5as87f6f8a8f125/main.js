// DAPP USER CONTROLLER

Events.subscribe('bot', function ( response ) {
	Events.publish(system.WebCtrl, 'generate', response.payload);
	Events.publish(system.LogCtrl, 'info', response.payload);
});