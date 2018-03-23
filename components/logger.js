const datetime = require( 'node-datetime' )
const UseLib = require( './uselib' )
const fs = require( 'fs' )

class Logger {
    * write (response, type) {
        let message = response.payload.message
        let target = response.payload.target
        
        let time = datetime.create()
        time = time.format( 'd-m-Y H:M:S' )

        const logfile = __logs + target+ '.log'
        let logmsg = time + ' : ' + type + ' : ' + JSON.stringify( message )

        if ( fs.existsSync( logfile ) ) {
            let string = fs.readFileSync( logfile ).toString()
            logmsg += '\n' + string
        }

        fs.writeFileSync(logfile, logmsg)
        io.emit('console', {type: type, time: time, target: target, message: JSON.stringify( message )})
    }
}

module.exports = Logger