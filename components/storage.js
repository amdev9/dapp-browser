class Storage {
    insert ( response ) {
        let object = Object.assign({target: response.from}, response.payload.message)
        
        db.storage.insert(object, (error, docs) => {
            io.emit('insert', object);
        });
    }

    find ( response ) {
        let object = response.payload;

        io.on('connection', function (socket) {
            socket.on('find', function () {
                db.storage.find(object, (error, docs) => {
                    io.emit('find', docs);
                })
            })
        })
    }

    findOne ( response ) {
        let object = response.payload;

        db.storage.findOne(object, (error, docs) => {
            delete docs.target;
            delete docs._id;

            io.emit('findOne', docs);
        })
    }

    update ( response ) {
        console.log( response )
    }

    remove ( response ) {
        console.log( response )
    }
}

module.exports = Storage;