const child_process = require( 'child_process' )
const Manager = require( './components/manager' )
const gui = require( 'nw.gui' )

const child = child_process.exec( './array ./bin/www' )
child.on('close', () => gui.App.quit())

const manager = new Manager( 'array://' )
manager.setValue = gui.App.argv

var connect
var server

nw.Window.open('connect.html', {
    show: false,
    width: screen.width,
    height: screen.height,
    frame: false,
    resizable: false,
    transparent: true
}, target => {
    connect = target
    connect.show()
})

child.stdout.on('data', () => {
    nw.Window.open('http://localhost:3000/', {
        show: false,
        min_width: 1000,
        min_height: 650
    }, target => {
        server = target
        server.window._webreq = manager.getValue

        server.on('close', () => child.kill())

        connect.close()
        server.show()
    })
})

gui.App.on('open', argv => {
    manager.setValue = argv
    server.window._webreq = manager.getValue

    server.window.postMessage('message', '*')
})