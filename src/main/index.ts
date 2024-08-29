import { app, shell, BrowserWindow, Menu, MenuItem } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import traincrewLibAdapter from './utils/traincrewLibAdapter'
import sharedVariables from './utils/sharedVariables'
import traincrewData from './utils/traincrewData'
import { setupTitlebar, attachTitlebarToWindow } from 'custom-electron-titlebar/main'
import './events/overlay'

// Setup titlebar
setupTitlebar()

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 520,
    height: 305,
    show: false,
    maximizable: false,
    resizable: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    frame: false,
    titleBarOverlay: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  attachTitlebarToWindow(mainWindow)

  sharedVariables.mainWindow = mainWindow

  mainWindow.setMenu(null)
  const menu = new Menu()
  Menu.setApplicationMenu(menu)

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('context-menu', () => {
    const menu = new Menu()
    // Copy and paste context menu
    menu.append(
      new MenuItem({
        label: 'コピー',
        role: 'copy'
      })
    )

    menu.append(
      new MenuItem({
        label: 'カット',
        role: 'cut'
      })
    )

    menu.append(
      new MenuItem({
        label: 'ペースト',
        role: 'paste'
      })
    )

    menu.popup()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('ch.tanu.tanuden.stopbar')

  // Disable debug menu keybind in production
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // // Register IPC events from events folder
  // ipcEvents

  createWindow()

  console.log('Main process started')

  // Enforce single instance
  const isOnlyInstance = app.requestSingleInstanceLock()
  if (!isOnlyInstance) {
    return app.quit()
  }

  // Initialize traincrew lib adapter
  traincrewLibAdapter.init()
  traincrewData.startDataLoop()

  app.on('before-quit', async () => {
    console.log('Main process stopping')
    traincrewData.stopDataLoop()
    traincrewLibAdapter.dispose()

    if (sharedVariables.overlayWindow) {
      sharedVariables.overlayWindow.close()
    }
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all closed except macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
