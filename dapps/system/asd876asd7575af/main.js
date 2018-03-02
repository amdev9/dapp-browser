// WEB SYSTEM CONTROLLER

Events.subscribe('web', response => {
    Events.publish(response.from, response.message_type, response.payload);
});

Events.subscribe('generate', response =>  {
    const array  = response.payload.message.empty;
    const rand   = Math.floor(Math.random() * (array.length - 1));
    const bounds = array[rand];

    response.payload.message.bounds = bounds;
    response.payload.callback()
});