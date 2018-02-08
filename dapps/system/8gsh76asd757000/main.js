// LOG SYSTEM CONTROLLER

Events.subscribe('debug', response => {
    Logger.write(response, 'DEBUG')
});

Events.subscribe('info', response => {
    Logger.write(response, 'INFO')
});

Events.subscribe('warning', response => {
    Logger.write(response, 'WARNING')
});

Events.subscribe('error', response => {
    Logger.write(response, 'ERROR')
});