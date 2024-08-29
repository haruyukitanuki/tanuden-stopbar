import { contextBridge, nativeImage } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Titlebar, TitlebarColor } from 'custom-electron-titlebar'
import { join } from 'path'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

window.addEventListener('DOMContentLoaded', () => {
  // If this is the overlay window, we don't need to setup the titlebar
  if (window.location.hash === '#/overlay') {
    return
  }

  const iconPath = join(__dirname, '../../resources/logo.png')

  // Setup titlebar
  new Titlebar({
    backgroundColor: TitlebarColor.fromHex('#1a1e23'),
    icon: nativeImage.createFromPath(iconPath)
  })
})
