const { app, BrowserWindow } = require('electron' )
const isDev = require('electron-is-dev')

app.disableHardwareAcceleration()

require('@electron/remote/main').initialize()

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        show: false,
        frame: false,
        icon: __dirname + '/icon.png',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
            // devTools: true
        }
    })
    win.maximize()
    // win.loadURL('http://localhost:3000')

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${__dirname}/../build/index.html`
    )
}

// app.on('ready', createWindow)

app.on('ready', () => {
    // Create the new window
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('active', function() {
    // On OS X it's common to re-create a window in the app the
    // dock icon is clicked and there are no other windows open.
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})