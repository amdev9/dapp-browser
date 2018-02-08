const vm = require( 'vm' );
const Logger = require( './logger' );
const EventBus = require( './event' );
const UserDappsLoader = require( '../components/user.loader' );

class SystemDappsLoader extends UserDappsLoader {
    sourceCode (_path, dirname, object) {
        let code = 'Events.data = ' + JSON.stringify( object );
        code += this.getFileSync( _path + '/' + object.main );

        // Sandbox
        let sandbox = {Events: new EventBus(), Logger: new Logger()};
        vm.runInContext(code, vm.createContext( sandbox ));
    }
}

module.exports = SystemDappsLoader;