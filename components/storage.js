class Storage {
    insert ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message);
        
        db.storage.insert(object, (error, docs) => {
            if ( error ) throw error;

            response.payload.docs = docs;
            return response.payload.callback()
        });
    }

    find ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message);

        db.storage.find(object, (error, docs) => {
            if ( error ) throw error;

            response.payload.docs = docs;
            return response.payload.callback()
        })
    }

    findOne ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message);

        db.storage.findOne(object, (error, docs) => {
            if ( error ) throw error;

            response.payload.docs = docs;
            return response.payload.callback()
        })
    }

    update ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message);

        db.storage.update({target: response.from}, object, {multi: true}, (error, num) => {
            if ( error ) throw error;
            
            return response.payload.callback()
        });
    }

    remove ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message);

        db.storage.remove(object, {multi: true}, (error, num) => {
            if ( error ) throw error;
            
            return response.payload.callback()
        });
    }
}

module.exports = Storage;