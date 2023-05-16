import { SerialPort } from 'serialport';
import { PortInfo } from '@serialport/bindings-cpp';

interface KeyboardProductVendorId {
  vendorId: string;
  productId: string;
}

const KEYBOARD_IDS: KeyboardProductVendorId[] = [{ vendorId: '05ac', productId: '0256', }];

const filterPort = (port: PortInfo) => {
  const foundKeyboard = KEYBOARD_IDS.find((e: KeyboardProductVendorId) => {
    return port.vendorId === e.vendorId && port.productId === e.productId;
  });

  return foundKeyboard !== undefined;
};

export async function listKeyboards(): Promise<PortInfo[]> {
  const ports = await SerialPort.list();
  const filteredPorts = ports.filter(filterPort);

  return filteredPorts;
}
