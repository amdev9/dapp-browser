const datetime = require("node-datetime");
const Frontend = require("./frontend");
const Finder = require("./finder");
const fs = require("fs");

const FrontEnd = new Frontend();
const Find = new Finder("logs/");

class Logger {
  async write(response, type) {
    const message = response.payload.message;
    const target = response.payload.target;

    const time = datetime.create().format("d-m-Y H:M:S");

    if (!Find.exists()) Find.mkdir();

    const filename = target + ".log";
    let string = time + " : " + type + " : " + JSON.stringify(message);

    if (Find.exists(filename)) {
      const content = Find.readFile(filename);
      string += "\n" + content;
    }

    Find.writeFile(filename, string);
    io.emit("console", {
      type: type,
      time: time,
      target: target,
      message: JSON.stringify(message)
    });

    FrontEnd.complete(response.payload);
  }
}

module.exports = Logger;
