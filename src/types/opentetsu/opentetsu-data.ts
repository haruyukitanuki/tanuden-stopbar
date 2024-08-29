// public class OpenTetsuData
// {
//     [JsonProperty("runNumber")] public string? RunNumber; // 運行番号

import { AtsState } from './ats'
import { ControllerState } from './controller'
import { Diagram, NextStation } from './route'
import { SignalState } from './signal-state'
import { TrainState } from './train'

interface OpenTetsuData {
  runNumber?: string // 運行番号
  diagramNumber?: string // 列車番号
  currentTime: Date
  diagram: Diagram
  nextStation: NextStation
  trainState: TrainState
  signalStates: SignalState[]
  atsState: AtsState
  controllerState: ControllerState
}

export type { OpenTetsuData }
