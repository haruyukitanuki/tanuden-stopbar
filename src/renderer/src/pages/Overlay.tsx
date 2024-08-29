import { AppStateContext } from '@renderer/context/app_global_state'
import { useContext } from 'react'
import { OpenTetsuData } from 'src/types/opentetsu/opentetsu-data'

const Overlay = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { gameData }: { gameData: OpenTetsuData } = useContext<any>(AppStateContext)

  const POSITION_MARKER_HEIGHT_PX = 16 / 2
  const SCREEN_HIGHT_METERS = 12
  const DISPLAY_AT = 350

  const positionPercentage = (): number => {
    if (!gameData?.diagramNumber) {
      return 0
    }

    if (gameData?.nextStation?.distanceFromTrain >= SCREEN_HIGHT_METERS) {
      return 0
    }

    return (100 - (gameData?.nextStation?.distanceFromTrain / SCREEN_HIGHT_METERS) * 100) / 2
  }

  if (DISPLAY_AT < gameData?.nextStation?.distanceFromTrain) {
    return <></>
  }

  return (
    <>
      <div className="overlay_stop-bar">
        <div className="overlay_stop-bar-container">
          <div className="overlay_stopArea-1m"></div>
          <div className="overlay_stopArea-pitari"></div>
        </div>
      </div>
      <div
        className="overlay_current-position"
        style={{
          top: `calc(${positionPercentage()}% - ${POSITION_MARKER_HEIGHT_PX}px)`
        }}
      ></div>
    </>
  )
}

export default Overlay
