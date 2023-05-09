export interface KeyboardKeyLayer {
  layerIndex: number;
  keys: string[];
}

export interface KeyboardKeyState {
  layers: KeyboardKeyLayer[];
}
