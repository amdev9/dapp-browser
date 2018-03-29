const child_process = require( 'child_process' )
const gui = require( 'nw.gui' )

const child = child_process.exec( './array ./bin/www' )
    
child.on('exit', () => {
    alert( 'process exit' )
})

// alert(gui.App.argv)

nw.Window.open('http://localhost:3000/', {
    title: 'Welcome',
    width: 1000,
    height: 650,
    frame: true, // false: disable toolbar
    // nodejs: false,
}, target => target.setMinimumSize(1000, 650))