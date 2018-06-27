const fs = require('fs');
const Frontend = require('./frontend');

const FrontEnd = new Frontend()

class Network {
  constructor() {
    this.source = 'blockchain.json';
  }

  async getJson(response) {
    const string = fs.readFileSync(this.source).toString()

    try {
      response.payload.response = JSON.parse(string)
    } catch (error) {
      console.error(error.name + ': ' + error.message)
    }

    FrontEnd.complete(response.payload)
  }
}

module.exports = Network;