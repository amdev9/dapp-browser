const electron = require('electron')
const server = require('./app')
const path = require('path')
const url = require('url')
const fs = require('fs')

const {app, dialog, session, BrowserWindow} = electron
// const homeDir = app.getPath( 'home' )

var window

function createWindow () {
	window = new BrowserWindow({
		width: 1200,
		height: 700,
		minWidth: 900,
		minHeight: 700,
		webPreferences: {
			nodeIntegration: false
		}
	})

	window.loadURL('http://localhost:3000/')
	window.on('closed', () => window = null)
	window.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  	if ( process.platform !== 'darwin' ) app.quit()
})

app.on('activate', () => {
	if ( window === null ) createWindow()
})