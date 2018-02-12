// WEB SYSTEM CONTROLLER

Events.subscribe('web', response => {
    Events.publish(response.from, response.message_type, response.payload);
});

Events.subscribe('response', response =>  {
    return response;
});