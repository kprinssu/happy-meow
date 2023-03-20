import { SerialPort } from 'serialport';
import { Buffer } from 'buffer';

const createPort = (path: string): SerialPort => {
  return new SerialPort({
    path: path,
    baudRate: 9600,
  });
};

const writeToKeyboard = async function (port: SerialPort, data: Buffer): Promise<boolean> {
  try {
    await port.write(data);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};

const readFromKeyboard = async function (port: SerialPort, size?: number): Promise<Buffer> {
  if (size !== undefined) {
    return await port.read(size);
  }

  return port.read();
};


export {
  createPort,
  writeToKeyboard,
  readFromKeyboard,
};
