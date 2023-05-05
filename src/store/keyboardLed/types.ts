import { FrameData } from '../../keyboard/parser/schema/PageData';

export interface KeyboardLedLayer {
  layerIndex: number;
  frames: FrameData[];
}

export interface KeyboardLedState {
  layers: KeyboardLedLayer[];
}
