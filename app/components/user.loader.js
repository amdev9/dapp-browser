const fs = require( 'fs' );
const vm = require( 'vm' );
const EventBus = require( './event' );
const UseLib = require( './uselib' );

class UserDappsLoader {
    constructor (data, source) {
        this.items = [];
        this.data = data;
        this.source = source;
    }

    getDirSync ( dirname ) {
        let items = [];

        fs.readdirSync( dirname ).forEach(element => {
            let object = {};

            if ( fs.lstatSync( dirname + '/' + element ).isDirectory() ) {
                items.push( element )
            }
        })

        return items;
    }

    getFileSync ( filepath ) {
        return fs.existsSync( filepath ) ? fs.readFileSync( filepath ).toString() : null;
    }

    runInContext () {
        const dapps = this.getDirSync( __apps + this.source );

        dapps.forEach(dirname => {
            let _path  = __apps + this.source + '/' + dirname;
            let object = this.getFileSync( _path + '/' + this.data );

            try {
                object = JSON.parse( object );
            } catch ( error ) {
                console.error( error.name + ': ' + error.message )
            }

            this.sourceCode(_path, dirname, object);
        })
    }

    sourceCode (_path, dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object );
        code += this.getFileSync( _path + '/' + object.main );
         
        object.icon   = this.source + '/' + dirname + '/' + object.icon;
        object.thumb  = this.source + '/' + dirname + '/' + object.thumb;
        object.index  = this.source + '/' + dirname + '/' + object.index;

        this.items.push( object );

        // Sandbox
        let sandbox = {Events: new EventBus(), system: new UseLib( 'system.id' )}
        vm.runInContext(code, vm.createContext( sandbox ));
    }
}

module.exports = UserDappsLoader;