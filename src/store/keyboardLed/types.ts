import { FrameData } from '../../keyboard/parser/schema/PageData';

export interface KeyboardLedLayer {
  layerNumber: number;
  frames: FrameData[];
}

export interface KeyboardLedState {
  layers: KeyboardLedLayer[];
}
