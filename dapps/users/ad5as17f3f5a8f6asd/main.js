// DAPP USER CONTROLLER

Events.subscribe('findOne', response => {
	Events.publish(system.StrCtrl, 'findOne', response.payload);
})

Events.subscribe('insert', response => {
	Events.publish(system.StrCtrl, 'insert', response.payload);
})

Events.subscribe('update', response => {
	Events.publish(system.StrCtrl, 'update', response.payload);
})