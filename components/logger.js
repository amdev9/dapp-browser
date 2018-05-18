const datetime = require( 'node-datetime' )
const Frontend = require( './frontend' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()

class Logger {
    async write (response, type) {
        const message = response.payload.message
        const target = response.payload.target
        
        const time = datetime.create().format( 'd-m-Y H:M:S' )

        const logfile = __logs + target+ '.log'
        let logmsg = time + ' : ' + type + ' : ' + JSON.stringify( message )

        if ( fs.existsSync( logfile ) ) {
            const string = fs.readFileSync( logfile ).toString()
            logmsg += '\n' + string
        }

        fs.writeFileSync(logfile, logmsg)
        io.emit('console', {type: type, time: time, target: target, message: JSON.stringify( message )})

        FrontEnd.complete( response.payload )  
    }
}

module.exports = Logger