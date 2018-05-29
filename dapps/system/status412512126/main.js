// STATUS SYSTEM CONTROLLER

Events.subscribe("connect", function(response) {
  Status.connect(response);
});
