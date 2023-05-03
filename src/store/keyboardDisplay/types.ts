import { FrameData } from '../../keyboard/parser/schema/PageData';

export interface KeyboardDisplayLayer {
  layerIndex: number;
  frames: FrameData[];
}

export interface KeyboardDisplayState {
  layers: KeyboardDisplayLayer[];
}
