const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let splash

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 480,
    frame: false,
    transparent: false,
    resizable: false,
    show: false,
    webPreferences: {
      devTools: false
    }
  })

  // Adding a new BrowserWindow for the Splash screen
  splash = new BrowserWindow({
    width: 800,
    height: 480,
    transparent: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      devTools: false
    }
  });

  // loading the 'splash.html' page for the Splash Window
  splash.loadURL(`file://${path.join(__dirname, '../build/splash.html')}`);
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // Once the main window is ready to serve, destryoing the splash window

  /* Settings for Mac and Windows Builds */
  // win.once('ready-to-show', () => {
  //   setTimeout(() => {
  //     splash.destroy();
  //     win.show();
  //   }, 5000);
  // });

  /* Settings for Raspberry PI Build */
  win.once('ready-to-show', () => {
    setTimeout(() => {
      splash.alwaysOnTop = false;
      splash.hide();
      win.show();
    }, 5000);
    // splash.destroy();
    // win.show();
  });

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    splash.show();
    setTimeout(() => {
      splash.destroy();
    }, 2000);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.