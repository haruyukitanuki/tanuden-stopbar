import { createContext, useState } from 'react'
import { GameData } from 'src/types/client-metadata'
export const AppStateContext = createContext({})

const AppState = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [gameData, setGameData] = useState<GameData['gameData'] | null | undefined>(null)

  return (
    <AppStateContext.Provider
      value={{
        gameData,
        setGameData
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export default AppState
