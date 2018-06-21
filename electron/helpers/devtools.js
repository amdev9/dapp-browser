

function openDevTool(win, isOpen) {
    if (isOpen) {
      win.webContents.openDevTools()
    } else {
      win.webContents.on("devtools-opened", () => {
        win.webContents.closeDevTools()
      })
    }
}

module.exports = openDevTool;