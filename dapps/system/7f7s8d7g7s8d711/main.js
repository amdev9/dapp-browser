// STORAGE SYSTEM CONTROLLER

Events.subscribe('insert', function * ( response ) {
    yield Storage.insert( response )
});

Events.subscribe('find', function * ( response ) {
    yield Storage.find( response )
});

Events.subscribe('findOne', function * ( response ) {
    yield Storage.findOne( response )
});

Events.subscribe('update', function * ( response ) {
    yield Storage.update( response )
});

Events.subscribe('remove', function * ( response ) {
    yield Storage.remove( response )
});