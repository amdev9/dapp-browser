// DAPP USER CONTROLLER

Events.subscribe('generate', response => {
	Events.publish(system.WebCtrl, 'generate', response.payload);
	Events.publish(system.LogCtrl, 'info', response.payload);
});