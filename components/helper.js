const {
  NodeVM
} = require('vm2');
const ProcessBus = require('./process');
const UseLib = require('./uselib');


let sandbox = {
  Events: new ProcessBus(),
  system: new UseLib('system.id')
}
// initialized by sandbox global.process
process.on('message', function(message) {
  if (message.init) return new NodeVM({
    sandbox: sandbox
  }).run(message.init)
  sandbox.Events.inject(message)
})