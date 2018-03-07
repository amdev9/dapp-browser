const Datastore = require( 'nedb' );
const codb = require( 'co-nedb' );

class Storage {
    * insert ( response ) {
        const database = new Datastore({filename: 'database/storage.db',  autoload: true});
        const storage  = codb( database );

        const object = Object.assign({target: response.from}, response.payload.message);
        const items  = yield storage.insert( object );

        response.payload.items = items;
    }

    * find ( response ) {
        const database = new Datastore({filename: 'database/storage.db',  autoload: true});
        const storage  = codb( database );

        const object = Object.assign({target: response.from}, response.payload.message);
        const items  = yield storage.find( object );

        response.payload.items = items;
    }

    * findOne ( response ) {
        const database = new Datastore({filename: 'database/storage.db',  autoload: true});
        const storage  = codb( database );

        const object = Object.assign({target: response.from}, response.payload.message);
        const items  = yield storage.findOne( object );

        response.payload.items = items;
    }

    * update ( response ) {
        const database = new Datastore({filename: 'database/storage.db',  autoload: true});
        const storage  = codb( database );

        const object = Object.assign({target: response.from}, response.payload.message);

        yield storage.update({target: response.from}, object, {multi: true});
    }

    * remove ( response ) {
        const database = new Datastore({filename: 'database/storage.db',  autoload: true});
        const storage  = codb( database );

        const object = Object.assign({target: response.from}, response.payload.message);

        yield storage.remove(object, {multi: true});
    }
}

module.exports = Storage;