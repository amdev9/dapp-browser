// WEB SYSTEM CONTROLLER

Events.subscribe('web', response => {
    if ( response.payload.message ) {
        if ( response.payload.message.form ) {
            let form = response.payload.message.form;
            form.username = form.username.replace(/[0-9]/g, '').replace(/\s+/g,' ').trim();
        }
    }

    Events.publish(response.from, response.message_type, response.payload);
});

Events.subscribe('response', response =>  {
    return response;
});