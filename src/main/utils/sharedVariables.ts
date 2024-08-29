import { BrowserWindow } from 'electron'

const variables = {
  intervalLoop: undefined as NodeJS.Timeout | undefined,
  mainWindow: undefined as BrowserWindow | undefined,
  overlayWindow: undefined as BrowserWindow | undefined
}

export default variables
