// DAPP USER CONTROLLER

Events.subscribe('bot', response => {
	Events.publish(system.WebCtrl, 'generate', response.payload);
	Events.publish(system.LogCtrl, 'info', response.payload);
});