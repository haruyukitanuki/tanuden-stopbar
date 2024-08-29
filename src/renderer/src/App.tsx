import { useContext, useEffect } from 'react'
import { AppStateContext } from './context/app_global_state'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Overlay from './pages/Overlay'

function App(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setGameData } = useContext<any>(AppStateContext)

  useEffect(() => {
    window.electron.ipcRenderer.on('gameData', (_, data) => {
      setGameData(data?.gameData)
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/overlay" element={<Overlay />} />
      </Routes>
    </>
  )
}

export default App
