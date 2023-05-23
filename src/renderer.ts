import { PortInfo } from '@serialport/bindings-cpp';

import './App';
import { CyberboardConfig } from './keyboard/parser/schema';

declare global {
  interface Window {
    keyboardAPI: {
      listKeyboards: () => Promise<PortInfo[]>,
      setTime: (portPath: string) => Promise<void>,
      syncKeyboard: (portPath: string, rawConfig: CyberboardConfig) => Promise<void>,
      writeConfig: (portPath: string, jsonPath: string) => Promise<void>,
      loadConfig: (path: string) => Promise<Cyberboard>,
    };
  }
}
