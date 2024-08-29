import traincrewLibAdapter from './traincrewLibAdapter'
import sharedVariables from './sharedVariables'
import { GameData } from '../../types/client-metadata'

let overrallGameData: GameData = {
  gameData: {}
}

const getOverrallGameData = (): GameData => {
  return overrallGameData
}

const dataLoop = async (): Promise<void> => {
  const rawGameData: GameData = traincrewLibAdapter.getData()

  overrallGameData = {
    gameData: rawGameData.gameData
  }

  sharedVariables.mainWindow!.webContents.send('gameData', overrallGameData)
  if (sharedVariables.overlayWindow) {
    sharedVariables.overlayWindow.webContents.send('gameData', overrallGameData)
  }
}

const startDataLoop = (): void => {
  sharedVariables.intervalLoop = setInterval(dataLoop, 50)
}

const stopDataLoop = (): void => {
  clearInterval(sharedVariables.intervalLoop)
}

export default {
  getOverrallGameData,
  dataLoop,
  startDataLoop,
  stopDataLoop
}
