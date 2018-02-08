// DAPP USER CONTROLLER

Events.subscribe('test', response => {
	Events.publish(system.WebCtrl, 'response', response.payload);
	Events.publish(system.LogCtrl, 'info', response.payload);
});