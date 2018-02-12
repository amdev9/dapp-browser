class Storage {
    insert ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message)
        
        db.storage.insert(object, (error, docs) => {
            if ( error ) throw error
        });
    }

    find ( response ) {
        db.storage.find(response.payload.message, (error, docs) => {
            if ( error ) throw error

            response.payload.docs = docs;
            return response.payload.callback()
        })
    }

    findOne ( response ) {
        db.storage.findOne(response.payload, (error, docs) => {
            if ( error ) throw error

            response.payload.message.docs = docs;
            return response.payload.callback()
        })
    }

    update ( response ) {
        console.log( response )
        // db.storage.update({year: 1946}, {name: "Doug the Head", year: 1940}, {});
    }

    remove ( response ) {
        db.storage.remove(response.payload.message, {multi: true}, (error, num) => {
            if ( error ) throw error;
            
            return response.payload.callback()
        });
    }
}

module.exports = Storage;