const datetime = require( 'node-datetime' )
const Frontend = require( './frontend' )

const FrontEnd = new Frontend()

class Status {
    async connect ( response ) {
        const target = response.payload.target
        const time = datetime.create().format( 'H:M:S' )

        io.emit('status', {target: target, time: time})

        FrontEnd.complete( response.payload )  
    }
}

module.exports = Status