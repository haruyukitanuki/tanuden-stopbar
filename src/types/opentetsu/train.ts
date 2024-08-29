import { Direction } from './route'

interface CarProperties {
  pantograph: boolean
  driverCab: boolean
  conductorCab: boolean
  motor: boolean
  cabDirection: Direction
}

interface CarState {
  amperage: number
  bcPressure: number
  carNo: number
  isDoorClosed: boolean
  model: string
  properties: CarProperties
}

interface LampsAts {
  brakeApplication: boolean
  inOperation: boolean
  isolated: boolean
}

interface Lamps {
  ats: LampsAts
  eBrake: boolean
  ebTimer: boolean
  overload: boolean
  pilot: boolean
  regenBrake: boolean
}

enum SpeedLimitType {
  Signal = 'Signal',
  SpeedLimit = 'SpeedLimit'
}

interface NextSpeedLimit {
  distance: number
  limit: number
  type: SpeedLimitType
}

interface TrainState {
  carStates: CarState[]
  consist: number
  lamps: Lamps
  mrPressure: number
  nextSpeedLimit: NextSpeedLimit
  speed: number
  speedLimit: number
  speedLimitType: SpeedLimitType
  gradient: number
  distanceFromKmZero: number
}

export type {
  CarProperties,
  CarState,
  LampsAts,
  Lamps,
  NextSpeedLimit,
  TrainState
}
