// ご注意！
// このファイルおよびMikasagawa API DLLバイナリはオープンソースソフトウェアではありません。無断使用はお断りします。

require('hazardous')
import { app } from 'electron'
import { join } from 'path'
import { GameData } from '../../types/client-metadata'
import { arch } from 'os'

const exePath = app.getAppPath()
const sysArch = arch()
export const dotnetPath = join(
  exePath,
  app.isPackaged ? `/bin/win-${sysArch}/dotnet` : `/bin/win-${sysArch}/dotnet`
)
console.log(`DOTNET at: ${dotnetPath}`)
process.env['DOTNET_ROOT'] = dotnetPath

export const mikasagawaPath = join(
  exePath,
  '/bin/universal/mikasagawa/Tanuden.Desktop.API.Mikasagawa'
)
console.log(`Mikasagawa at: ${mikasagawaPath}`)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Mikasagawa = require(
  mikasagawaPath
) as typeof import('../../../bin/universal/mikasagawa/Tanuden.Desktop.API.Mikasagawa')

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
