require('babel-polyfill')
const electron = require('electron')
const { app, BrowserWindow, Tray } = electron
const path = require('path');
const url = require('url');
const openAppServer = require('./server')

// Let electron reloads by itself when webpack watches changes in ./app/
if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname)
}

// To avoid being garbage collected
let mainWindow
openAppServer()
app.on('ready', () => {
    const trayWidth = 400
    const trayHeight = 600
    const tray = new Tray(`${__dirname}/icon.png`)
    const win = new BrowserWindow({
        width: trayWidth,
        height: trayHeight,
        x: (tray.getBounds().x) - (trayWidth/2),
        y: 0,
        frame: false,
    })
    console.log()
    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
      })
      win.on('show', () => {
        tray.setHighlightMode('always')
      })
      win.on('hide', () => {
        tray.setHighlightMode('never')
      })    


    const startUrl = process.env.ELECTRON_START_URL || url.format({
          pathname: path.join(__dirname, './build/index.html'),
          protocol: 'file:',
          slashes: true
        });

    win.loadURL(startUrl)

    win.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
