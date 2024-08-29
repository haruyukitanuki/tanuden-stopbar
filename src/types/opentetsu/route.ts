enum StopType {
  PassengerStop = 'PassengerStop',
  OperationStop = 'OperationStop',
  Passing = 'Passing'
}

interface StationTimings {
  arrival: Date
  departure: Date
}

interface Station {
  distanceFromKmZero: number
  index: number
  name: string
  positionName: string
  stopType: StopType
  timings: StationTimings
}

enum Direction {
  Inbound = 'Inbound',
  Outbound = 'Outbound',
  Both = 'Both'
}

interface Diagram {
  direction: Direction
  boundFor: string
  remainingDistance: number
  serviceType: string
  stations: Station[]
}

interface NextStation extends Station {
  distanceFromTrain: number
}

export type { StationTimings, Station, Diagram, NextStation }

export { StopType, Direction }
