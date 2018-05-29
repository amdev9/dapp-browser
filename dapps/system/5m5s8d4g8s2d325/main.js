// MARKET PLACE SYSTEM CONTROLLER

Events.subscribe("market", function(response) {
  Network.getJson(response);
});
