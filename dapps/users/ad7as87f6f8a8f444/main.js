// DAPP USER CONTROLLER

Events.subscribe('webreq', response => {
	Events.publish(system.WebCtrl, 'response', response.payload);
	Events.publish(system.LogCtrl, 'debug', response.payload);
});