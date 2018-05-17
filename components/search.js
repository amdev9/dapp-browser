const Frontend = require( './frontend' )
const Finder = require( './finder' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()
const Find = new Finder( 'dapps/users/' )

class Search {
    async query ( response ) {
        const message = response.payload.message
        const sql = `SELECT * FROM results WHERE value LIKE '%${message}%'`

        response.payload.response = await new Promise(resolve => {
            sqlite.all(sql, (error, rows) => resolve( rows ))
        })

        FrontEnd.complete( response.payload )
    }

    async select ( response ) {
        const target = response.payload.target
        const sql = `SELECT value, url FROM results WHERE hash = '${target}'`

        response.payload.response = await new Promise(resolve => {
            sqlite.all(sql, (error, rows) => resolve( rows ))
        })

        FrontEnd.complete( response.payload )
    }

    async delete ( response ) {
        const message = response.payload.message
        const target = response.payload.target

        const remove = [message.value, message.url, target]
        const sql = `DELETE FROM results WHERE value = ? AND url = ? AND hash = ?`

        await new Promise(resolve => {
            const prepare = sqlite.prepare( sql )

            prepare.run( remove )
            prepare.finalize()
            
            resolve()
        })

        FrontEnd.complete( response.payload )
    }

    async destroy ( response ) { 
        const target = response.payload.target
        const sql = `DELETE FROM results WHERE hash = '${target}'`

        await new Promise(resolve => sqlite.run(sql, resolve))

        FrontEnd.complete( response.payload )
    }

    async insert ( response ) {
        const message = response.payload.message
        const target = response.payload.target

        const data = Find.getFileSync( target )

        try {
            var object = JSON.parse( data )
        } catch ( error ) {
            return FrontEnd.complete( response.payload )
        }

        const url = 'arr://' + object.unic + ':mainet/?' + message.url
        const icon = 'users/' + target + '/' + object.icon

        const insert = [object.hash, object.name, message.value, url, icon]
        
        const into = `INSERT INTO results VALUES (?, ?, ?, ?, ?)`
        const select = `SELECT value, hash FROM results WHERE hash = '${target}' AND value = '${message.value}'`

        await new Promise(resolve => {
            sqlite.all(select, (error, rows) => {
                if ( rows.length ) return resolve()
                
                const prepare = sqlite.prepare( into )

                prepare.run( insert )
                prepare.finalize()

                resolve()
            })
        })

        FrontEnd.complete( response.payload )
    }
}

module.exports = Search