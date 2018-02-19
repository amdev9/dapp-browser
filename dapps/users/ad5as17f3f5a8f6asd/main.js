// DAPP USER CONTROLLER

Events.subscribe('find', response => {
	Events.publish(system.StrCtrl, 'find', response.payload);
})

Events.subscribe('insert', response => {
	Events.publish(system.StrCtrl, 'insert', response.payload);
})

Events.subscribe('update', response => {
	Events.publish(system.StrCtrl, 'update', response.payload);
})

Events.subscribe('remove', response => {
	Events.publish(system.StrCtrl, 'remove', response.payload);
})