const Frontend = require("./frontend");

const FrontEnd = new Frontend();

class Storage {
  async insert(response) {
    const object = Object.assign(
      { target: response.from },
      response.payload.message || {}
    );

    const output = await new Promise(resolve => {
      db.storage.insert(object, (error, rows) => resolve(rows));
    });

    response.payload.response = output;
    FrontEnd.complete(response.payload);
  }

  async find(response) {
    const object = Object.assign(
      { target: response.from },
      response.payload.where || {}
    );

    const output = await new Promise(resolve => {
      db.storage.find(object, (error, rows) => resolve(rows));
    });

    response.payload.response = output;
    FrontEnd.complete(response.payload);
  }

  async findOne(response) {
    const object = Object.assign(
      { target: response.from },
      response.payload.where || {}
    );

    const output = await new Promise(resolve => {
      db.storage.findOne(object, (error, result) => resolve(result));
    });

    response.payload.response = output;
    FrontEnd.complete(response.payload);
  }

  async update(response) {
    const where = Object.assign(
      { target: response.from },
      response.payload.where || {}
    );
    const object = Object.assign(
      { target: response.from },
      response.payload.message || {}
    );

    await new Promise(resolve => {
      db.storage.update(where, object, { multi: true }, resolve);
    });

    FrontEnd.complete(response.payload);
  }

  async remove(response) {
    const object = Object.assign(
      { target: response.from },
      response.payload.where || {}
    );

    await new Promise(resolve => {
      db.storage.remove(object, { multi: true }, resolve);
    });

    FrontEnd.complete(response.payload);
  }
}

module.exports = Storage;
