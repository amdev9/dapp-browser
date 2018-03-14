// DAPP USER CONTROLLER

Events.subscribe('find', function (response) {
	Events.publish(system.StrCtrl, 'find', response.payload);
})

Events.subscribe('insert', function (response) {
	Events.publish(system.StrCtrl, 'insert', response.payload);
})

Events.subscribe('update', function (response) {
	Events.publish(system.StrCtrl, 'update', response.payload);
})

Events.subscribe('remove', function (response) {
	Events.publish(system.StrCtrl, 'remove', response.payload);
})