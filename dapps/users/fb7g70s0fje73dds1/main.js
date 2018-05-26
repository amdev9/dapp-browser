// DAPP USER CONTROLLER

Events.subscribe('sign', function ( response ) {
	Events.publish(system.KcnCtrl, 'sign', response.payload )
});