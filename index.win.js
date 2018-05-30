const { exec } = require( 'child_process' )
const Manager = require( './components/manager' )
const port = require( 'find-free-port' )
const gui = require( 'nw.gui' )

var connect
var server
var spawn

const menubar = new nw.Menu({type: 'menubar'})
menubar.createMacBuiltin( 'Array.IO' )

port(33888, '127.0.0.1', 100, function (error, free) {
	spawn = exec( 'array.exe ./bin/www', {env: {PORT: free}})
    spawn.on('close', () => gui.App.quit())

    nw.Window.open('connect.html', {
        show: false,
        width: screen.width,
        height: screen.height,
        frame: false,
        resizable: false,
        transparent: true
    }, target => {
        connect = target
        connect.menu = menubar

        connect.show()
        connect.on('close', () => spawn.kill())
    })
       
    spawn.stdout.once('data', data => {
        nw.Window.open('127.0.0.1:' + free, {
            show: false,
            min_width: 1000,
            min_height: 650
        }, target => {
            server = target
            server.menu = menubar
    
            const manager = new Manager()
            manager.setValue = gui.App.argv
    
            server.window.addEventListener('DOMContentLoaded', event => {
                server.window.postMessage(manager.getValue, '*')
            })
    
            server.on('close', () => spawn.kill())
    
            connect.hide()
            server.show()
        })
    })
})

gui.App.on('open', argv => {
    const manager = new Manager()
    manager.setValue = argv
    
    server.window.postMessage(manager.getValue, '*')
})
