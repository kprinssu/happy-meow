
export interface KeyboardDisplayLayer {
  layerIndex: number;
  frames: FrameData[];
}

export interface KeyboardDisplayState {
  layers: KeyboardDisplayLayer[];
}
