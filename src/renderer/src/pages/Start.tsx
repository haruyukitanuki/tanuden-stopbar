import { AppStateContext } from '@renderer/context/app_global_state'
import { roundNumber } from '@renderer/utils/arithmetic'
import { useContext, useEffect, useState } from 'react'
import TrainIcon from '../assets/Kumoha5300-2p.png'
import { OpenTetsuData } from 'src/types/opentetsu/opentetsu-data'

const Start = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { gameData }: { gameData: OpenTetsuData } = useContext<any>(AppStateContext)

  const [overlayOpened, setOverlayOpened] = useState(false)
  const allowOverlay = !!gameData?.diagramNumber

  const [trainAheadDisplay, setTrainAheadDisplay] = useState<Array<JSX.Element>>()
  // Solely for cosmetic purposes. To make the route look like its moving.
  const [trackOddEven, setTrackOddEven] = useState<boolean>()

  useEffect(() => {
    if (gameData?.nextStation?.distanceFromTrain && gameData?.nextStation?.distanceFromTrain > 0) {
      // Create blank array of gameData.nextStation.distanceFromTrain length
      const arrayLength = Array.from({
        length: parseInt(gameData.nextStation.distanceFromTrain.toString())
      })

      const trainAheadDisplayArray: Array<JSX.Element> = arrayLength.map((_, i) => {
        if (i === parseInt(gameData.nextStation.distanceFromTrain.toString()) - 1) {
          if (gameData.nextStation.stopType === 'Passing') {
            return <div key={i} className="train-illust_block station-pass-marker"></div>
          }
          return <div key={i} className="train-illust_block station-marker"></div>
        } else if (
          gameData.nextStation.distanceFromTrain - i <= 10 &&
          gameData.nextStation.stopType !== 'Passing'
        ) {
          return <div key={i} className="train-illust_block close-block stage-4"></div>
        } else if (
          gameData.nextStation.distanceFromTrain - i <= 50 &&
          gameData.nextStation.stopType !== 'Passing'
        ) {
          return <div key={i} className="train-illust_block close-block stage-3"></div>
        } else if (
          gameData.nextStation.distanceFromTrain - i <= 150 &&
          gameData.nextStation.stopType !== 'Passing'
        ) {
          return <div key={i} className="train-illust_block close-block stage-2"></div>
        } else if (
          gameData.nextStation.distanceFromTrain - i <= 250 &&
          gameData.nextStation.stopType !== 'Passing'
        ) {
          return <div key={i} className="train-illust_block close-block stage-1"></div>
        } else {
          setTrackOddEven((prev) => !prev)

          const even = <div key={i} className={`train-illust_block even`}></div>
          const odd = <div key={i} className={`train-illust_block odd`}></div>

          if (i % 2 === 0) {
            if (trackOddEven) {
              return even
            }
            return odd
          }

          if (!trackOddEven) {
            return even
          }

          return odd
        }
      })

      setTrainAheadDisplay(trainAheadDisplayArray)
    }
  }, [gameData?.nextStation?.distanceFromTrain])

  return (
    <main>
      <section className="section py-0 pr-0">
        <div className="container">
          <div className="train-illust">
            <div
              style={{
                background: `url(${TrainIcon}) center center no-repeat`,
                backgroundSize: 'contain',
                height: '4rem',
                width: '4rem',
                display: 'inline-block'
              }}
            ></div>
            {trainAheadDisplay?.map((block) => block)}

            <div
              style={{
                height: '100%',
                width: '4rem',
                display: 'inline-block',
                verticalAlign: 'top'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',

                  height: '100%'
                }}
              >
                {gameData?.nextStation?.stopType === 'Passing' ? (
                  <div className="has-text-success is-size-5 has-text-weight-semibold ml-3">
                    通過
                  </div>
                ) : (
                  <>
                    <div className="train-illust_block station-marker-after"></div>
                    <div className="has-text-danger is-size-5 has-text-weight-semibold ml-3">
                      停車
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section has-background-light py-4">
        <div className="container">
          <div className="card is-shadowless is-bordered">
            <div className="card-content">
              <div className="columns is-mobile is-gapless">
                <div className="column has-text-centered is-one-quarter">
                  <div>
                    <p className="heading is-size-7">運行番号</p>
                    <p className="title is-6 is-family-monospace">
                      {gameData?.runNumber || <>&mdash;</>}
                    </p>
                  </div>
                </div>
                <div className="column has-text-centered is-one-quarter">
                  <div>
                    <p className="heading is-size-7">列車番号</p>
                    <p className="title is-6 is-family-monospace">{gameData?.diagramNumber}</p>
                  </div>
                </div>
                <div className="column has-text-centered is-one-quarter">
                  <div>
                    <p className="heading is-size-7">速度</p>
                    <p className="title is-6 is-family-monospace">
                      {roundNumber(gameData?.trainState.speed, 1)}km/h
                    </p>
                  </div>
                </div>
                <div className="column has-text-centered is-one-quarter">
                  <div>
                    <p className="heading is-size-7">距離</p>
                    <p className="title is-6 is-family-monospace">
                      {roundNumber(gameData?.nextStation?.distanceFromTrain || 0, 2)}m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <button
              type="button"
              className={`button is-primary is-fullwidth my-2 ${overlayOpened ? 'is-outlined' : ''}`}
              disabled={overlayOpened || !allowOverlay}
              onClick={() => {
                window.electron.ipcRenderer.invoke('toggleOverlay', true)
                setOverlayOpened(true)
              }}
            >
              {allowOverlay && overlayOpened ? (
                <>{overlayOpened ? 'オーバーレイ有効です' : 'オーバーレイを開く'}</>
              ) : (
                'ダイヤを選択してください'
              )}
            </button>
            <p className="has-text-grey-light">
              ダイヤを選択した後のみに、オーバーレイが開けます。
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Start
