import { PortInfo } from '@serialport/bindings-cpp';

interface KeyboardPortState {
  selectedPort: PortInfo | null;
  allPorts: PortInfo[];
}

export {
  PortInfo,
  KeyboardPortState
};
