enum SignalType {
  Standard = 'Standard',
  Switch = 'Switch',
  Home = 'Home',
  Departure = 'Departure'
}

interface Transponder {
  type: string
  speedLimit: number
  distance: number
}

interface SignalState {
  name: string
  type: SignalType
  phase: string
  distance: number
  transponder: Transponder[]
}

export type { SignalType, Transponder, SignalState }
