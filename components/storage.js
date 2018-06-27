const Frontend = require('./frontend')
const Facade = require('./global')

const FrontEnd = new Frontend()

class Storage {
    async insert ( response ) {
        const object = Object.assign({hash: response.from}, response.payload.message || {})

        await new Promise(resolve => {
            Facade.db().storage.post( object ).then( resolve )
        })

        response.payload.response = object
        FrontEnd.complete( response.payload )
    }

    async find ( response ) {
        const object = Object.assign({hash: response.from}, response.payload.where || {})

        response.payload.response = await new Promise(resolve => {
            Facade.db().storage.find({selector: object}).then(response => resolve( response.docs ))
        })

        FrontEnd.complete( response.payload )
    }

    async update ( response ) {
        const object = Object.assign({hash: response.from}, response.payload.where || {})
        const message = response.payload.message

        const data = await new Promise(resolve => {
            Facade.db().storage.find({selector: object}).then(response => resolve(response.docs))
        })

        data.forEach(item => {
            Facade.db().storage.put(Object.assign(item, message))
        })
    }

    async remove(response) {
        const object = Object.assign({
            hash: response.from
        }, response.payload.where || {})
    }

    async remove ( response ) {
        const object = Object.assign({hash: response.from}, response.payload.where || {})

        const data = await new Promise(resolve => {
            Facade.db().storage.find({selector: object}).then(response => resolve( response.docs ))
        })

        data.forEach(item => Facade.db().storage.remove( item ))

        FrontEnd.complete( response.payload )
    }
}

module.exports = Storage;
