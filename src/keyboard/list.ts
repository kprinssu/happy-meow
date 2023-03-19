import { SerialPort } from 'serialport';

interface KeyboardProductVendorId {
  vendorId: string;
  productId: string;
};

const KEYBOARD_IDS: KeyboardProductVendorId[] = [{ vendorId: '05ac', productId: '0256' }];

const filterPort = (port: PortInfo) => {
  const foundKeyboard = KEYBOARD_IDS.find((e: KeyboardProductVendorId) => {
    return port.vendorId === e.vendorId && port.productId === e.productId;
  });

  return foundKeyboard !== undefined;
};

export async function listKeyboards(): SerialPort.PortInfo[] {
  const ports = await SerialPort.list();
  const filteredPorts = ports.filter(filterPort);
  console.log(filteredPorts);
  return filteredPorts;
};
