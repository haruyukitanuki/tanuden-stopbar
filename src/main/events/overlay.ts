import { is } from '@electron-toolkit/utils'
import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
import { OVERLAY_WINDOW_OPTS, OverlayController } from 'electron-overlay-window'
import { join } from 'path'
import variables from '../utils/sharedVariables'

function createOverlayWindow(): BrowserWindow {
  const overlayWindow = new BrowserWindow({
    ...OVERLAY_WINDOW_OPTS,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    overlayWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/overlay')
    // overlayWindow.webContents.openDevTools()
  } else {
    overlayWindow.loadFile(join(__dirname, '../renderer/index.html'), {
      hash: 'overlay',
      query: { noTitlebar: '1' }
    })
  }

  return overlayWindow
}

ipcMain.handle('toggleOverlay', (_: IpcMainInvokeEvent, toggle: boolean) => {
  console.log('Overlay toggle:', toggle)

  const overlayWindow = createOverlayWindow()
  variables.overlayWindow = overlayWindow

  if (toggle) {
    OverlayController.attachByTitle(overlayWindow, 'TrainCrew')
    OverlayController.activateOverlay()
  }

  return toggle
})
