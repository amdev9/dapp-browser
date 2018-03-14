const UseLib = require( './uselib' )

const storage = new UseLib( 'system.map' )

class Storage {
    insert ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)

        db.storage.insert(object, (error, rows) => {
            if ( storage[response.payload.target] )
                storage[response.payload.target][response.payload.message_type] = rows
        })
    }

    find ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)

        db.storage.find(object, (error, rows) => {
            if ( storage[response.payload.target] )
                storage[response.payload.target][response.payload.message_type] = rows
        })
    }

    findOne ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)

        db.storage.findOne(object, (error, string) => {
            if ( storage[response.payload.target] )
                storage[response.payload.target][response.payload.message_type] = string
        })
    }

    update ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)

        db.storage.update({target: response.from}, object, {multi: true})
    }

    remove ( response ) {
        const object = Object.assign({target: response.from}, response.payload.message)

        db.storage.remove(object, {multi: true})
    }
}

module.exports = Storage