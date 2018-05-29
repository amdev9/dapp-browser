const Frontend = require( './frontend' )
const Finder = require( './finder' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()
const Find = new Finder( 'dapps/users/' )

class Search {
    async query ( response ) {
        const message = response.payload.message

        response.payload.response = await new Promise(resolve => {
            db.search.find({
                selector: {value: {'$regex': message}}
            }).then(response => resolve( response.docs ))
        })

        FrontEnd.complete( response.payload )
    }

    async select ( response ) {
        const target = response.payload.target

        response.payload.response = await new Promise(resolve => {
            db.search.find({
                selector: {hash: target},
                fields: ['value', 'url']
            }).then(response => resolve( response.docs ))
        })

        FrontEnd.complete( response.payload )
    }

    async delete ( response ) {
        const message = response.payload.message
        const target = response.payload.target

        const data = await new Promise(resolve => {
            db.search.find({
                selector: {hash: target, value: message.value, url: message.url}
            }).then( resolve )
        })

        data.docs.forEach(item => db.search.remove( item ))

        FrontEnd.complete( response.payload )
    }

    async destroy ( response ) { 
        const target = response.payload.target

        const data = await new Promise(resolve => {
            db.search.find({
                selector: {hash: target}
            }).then( resolve )
        })

        data.docs.forEach(item => db.search.remove( item ))

        FrontEnd.complete( response.payload )
    }

    async insert ( response ) {
        const target = response.payload.target
        const query = response.payload.message.url
        const value = response.payload.message.value

        const string = Find.readFile(target + '/manifest.json')

        try {
            var object = JSON.parse( string )
        } catch ( error ) {
            return FrontEnd.complete( response.payload )
        }

        const data = await new Promise(resolve => {
            db.search.find({
                selector: {hash: object.hash, value: value}
            }).then(response => resolve( response.docs ))
        })

        if ( data.length ) return FrontEnd.complete( response.payload )

        const url = 'arr://' + object.unic + ':mainet/?' + query
        const icon = 'users/' + target + '/' + object.icon

        await new Promise(resolve => {
            db.search.post({
                url: url,
                query: query,
                value: value,
                hash: object.hash,
                name: object.name,
                icon: icon
            }).then( resolve )
        })

        FrontEnd.complete( response.payload )
    }
}

module.exports = Search