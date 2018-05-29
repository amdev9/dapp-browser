const Finder = require("./finder");
const path = require("path");
const fs = require("fs");

const Find = new Finder("dapps/users/");

class DappManager {
  constructor(proto) {
    this.argv = [];
    this.params = {};
    this.dapps = Find.getDirs();
  }

  getData(name) {
    const data = {};

    for (let i = 0; i < this.dapps.length; i++) {
      let object = Find.readFile(this.dapps[i] + "/manifest.json");

      try {
        object = JSON.parse(object);
      } catch (error) {
        console.error(error.name + ": " + error.message);
      }

      if (object.unic == name) {
        const _path = "users/" + object.hash + "/";

        data.id = object.hash;
        data.name = object.name;
        data.icon = _path + object.icon;
        data.src = _path + object.index;

        break;
      }
    }

    return data;
  }

  set setValue(value) {
    const string = String(value)
      .split("://")
      .pop();
    const array = string.split("?");

    const argv = array.shift().replace(RegExp("/", "g"), "");

    this.argv = argv.split(":");

    if (!array.length) return;

    const params = array.shift();
    const object = params.split("&");

    for (let i = 0; i < object.length; i++) {
      let keyval = object[i].split("=");
      this.params[keyval.shift()] = keyval.shift();
    }
  }

  get getValue() {
    if (!this.argv.length) return {};

    const name = this.argv.shift();
    const network = this.argv.shift();

    const data = this.getData(name);
    data.network = network;
    data.params = this.params;

    return data;
  }
}

module.exports = DappManager;
