const child_process = require( 'child_process' )
child_process.exec('node ./bin/www')

nw.Window.open('http://localhost:3000/', {
    title: 'Welcome',
    width: 1000,
    height: 650,
    frame: true, // false: disable toolbar
}, target => target.setMinimumSize(1000, 650))