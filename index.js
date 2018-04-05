const child_process = require( 'child_process' )
const Manager = require( './components/manager' )
const gui = require( 'nw.gui' )

const child = child_process.exec( './array ./bin/www' )
child.on('close', () => gui.App.quit())

const manager = new Manager()
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

    connect.on('close', () => child.kill())
})

child.stdout.on('data', () => {
    nw.Window.open('http://localhost:3000/', {
        show: false,
        min_width: 1000,
        min_height: 650
    }, target => {
        server = target

        const message = manager.getValue
        message.start = true

        server.window.addEventListener('DOMContentLoaded', event => {
            server.window.postMessage(message, '*')
        })

        server.on('close', () => child.kill())

        connect.hide()
        server.show()
    })
})

gui.App.on('open', argv => {
    manager.setValue = argv

    const message = manager.getValue
    message.start = false
    
    server.window.postMessage(message, '*')
})