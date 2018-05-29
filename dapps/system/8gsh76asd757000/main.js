// LOG SYSTEM CONTROLLER

Events.subscribe("debug", function(response) {
  Logger.write(response, "DEBUG");
});

Events.subscribe("info", function(response) {
  Logger.write(response, "INFO");
});

Events.subscribe("warning", function(response) {
  Logger.write(response, "WARNING");
});

Events.subscribe("error", function(response) {
  Logger.write(response, "ERROR");
});
