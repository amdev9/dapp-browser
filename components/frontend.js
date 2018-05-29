const UseLib = require("./uselib");

const mapping = new UseLib("system.map");

class FrontEnd {
  complete(payload) {
    if (!mapping[payload.unic]) return;

    mapping[payload.unic](payload);
    delete mapping[payload.unic];
  }
}

module.exports = FrontEnd;
