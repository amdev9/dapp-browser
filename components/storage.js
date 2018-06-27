const Frontend = require( './frontend' );

const FrontEnd = new Frontend();

class Storage {
  async insert ( response ) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.message || {});

    await db.storage.post( object );

    response.payload.response = object;
    FrontEnd.complete( response.payload );
  }

  async find ( response ) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.where || {});

    const output = await db.storage.find({
      selector: object
    });

    response.payload.response = output.docs;
    FrontEnd.complete( response.payload );
  }

  async update ( response ) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.where || {});

    const message = response.payload.message;

    const output = await db.storage.find({
      selector: object
    });

    output.docs.forEach(item => {
      db.storage.put(Object.assign(item, message))
    });

    FrontEnd.complete( response.payload );
  }

  async remove ( response ) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.where || {});

    const output = await db.storage.find({
      selector: object
    });

    output.docs.forEach(item => db.storage.remove( item ));
    FrontEnd.complete( response.payload );
  }
}

module.exports = Storage;
