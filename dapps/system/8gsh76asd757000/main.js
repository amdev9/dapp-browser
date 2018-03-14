// LOG SYSTEM CONTROLLER

Events.subscribe('debug', function * ( response ) {
    yield Logger.write(response, 'DEBUG')
});

Events.subscribe('info', function * ( response ) {
    yield Logger.write(response, 'INFO')
});

Events.subscribe('warning', function * ( response ) {
    yield Logger.write(response, 'WARNING')
});

Events.subscribe('error', function * ( response ) {
    yield Logger.write(response, 'ERROR')
});