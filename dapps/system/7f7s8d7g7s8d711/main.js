// STORAGE SYSTEM CONTROLLER

Events.subscribe('insert', response => {
    Storage.insert( response )
});

Events.subscribe('find', response => {
    Storage.find( response )
});

Events.subscribe('findOne', response => {
    Storage.findOne( response )
});

Events.subscribe('update', response => {
    Storage.update( response )
});

Events.subscribe('remove', response => {
    Storage.remove( response )
});