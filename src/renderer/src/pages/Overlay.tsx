import { AppStateContext } from '@renderer/context/app_global_state'
import { useContext } from 'react'
import { OpenTetsuData } from 'src/types/opentetsu/opentetsu-data'

const Overlay = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { gameData }: { gameData: OpenTetsuData } = useContext<any>(AppStateContext)

  const POSITION_MARKER_HEIGHT_PX = 20
  const SCREEN_HEIGHT_METERS = 6
  const BAR_HEIGHT_METERS = SCREEN_HEIGHT_METERS / 2
  const INNER_BAR_METERS = 1
  const DISPLAY_AT = 200

  const positionPercentage = (): number => {
    if (!gameData?.diagramNumber) {
      return 0
    }

    return (100 - (gameData?.nextStation?.distanceFromTrain / SCREEN_HEIGHT_METERS) * 100) / 2
  }

  return (
    <>
      {(DISPLAY_AT >= gameData?.nextStation?.distanceFromTrain ||
        ['終端P', 'P接近', '停P'].includes(gameData?.atsState?.state)) && (
        <>
          <div
            className="overlay_stop-bar"
            style={{
              height: (BAR_HEIGHT_METERS / SCREEN_HEIGHT_METERS) * 100 + '%'
            }}
          >
            <div className="overlay_stop-bar-container">
              <div
                className="overlay_stopArea-inner"
                style={{
                  height: (INNER_BAR_METERS / BAR_HEIGHT_METERS) * 100 + '%'
                }}
              ></div>
              <div
                className="overlay_stopArea-pitari"
                style={{
                  height: POSITION_MARKER_HEIGHT_PX + 'px'
                }}
              ></div>
            </div>
          </div>
          <div
            className="overlay_current-position"
            style={{
              top: `calc(${positionPercentage()}% - ${POSITION_MARKER_HEIGHT_PX / 2}px)`,
              height:
                Math.sqrt(POSITION_MARKER_HEIGHT_PX ** 2 + POSITION_MARKER_HEIGHT_PX ** 2) / 2 +
                'px',
              width:
                Math.sqrt(POSITION_MARKER_HEIGHT_PX ** 2 + POSITION_MARKER_HEIGHT_PX ** 2) / 2 +
                'px'
            }}
          ></div>
        </>
      )}
    </>
  )
}

export default Overlay
