// ご注意！
// このファイルおよびMikasagawa API DLLバイナリはオープンソースソフトウェアではありません。無断使用はお断りします。

require('hazardous')
import { app } from 'electron'
import { join } from 'path'
import dotnet from 'node-api-dotnet/net8.0'
import { GameData } from '../../types/client-metadata'

const srcPath = join(app.getAppPath(), '/dll')
const mikasagawaPath = join(srcPath, '/Tanuden.Desktop.API.Mikasagawa')
const Mikasagawa = dotnet.require(mikasagawaPath)

export default {
  init: (): void => {
    Mikasagawa.Methods.init()
  },
  getData: (): GameData => {
    const data = Mikasagawa.Methods.getData()
    return JSON.parse(data as string) as GameData
  },
  dispose: (): void => {
    Mikasagawa.Methods.dispose()
  }
}
