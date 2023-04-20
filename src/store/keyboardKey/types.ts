export interface KeyboardKeyLayer {
  layerNumber: number;
  keys: string[];
}

export interface KeyboardKeyState {
  layers: KeyboardKeyLayer[];
}
