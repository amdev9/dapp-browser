// STORAGE SYSTEM CONTROLLER

Events.subscribe("insert", function(response) {
  Storage.insert(response);
});

Events.subscribe("find", function(response) {
  Storage.find(response);
});

Events.subscribe("findOne", function(response) {
  Storage.findOne(response);
});

Events.subscribe("update", function(response) {
  Storage.update(response);
});

Events.subscribe("remove", function(response) {
  Storage.remove(response);
});
