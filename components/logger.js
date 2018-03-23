const datetime = require( 'node-datetime' )
const Frontend = require( './frontend' )
const UseLib = require( './uselib' )
const fs = require( 'fs' )

const FrontEnd = new Frontend()
const mapping  = new UseLib( 'system.map' )

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

        FrontEnd.complete( response.payload )  
    }
}

module.exports = Logger