import { SerialPort } from 'serialport';
import { SerialPortStream } from '@serialport/stream';
import { Buffer } from 'buffer';

const createPort = (path: string): SerialPort => {
  return new SerialPort({
    path: path,
    baudRate: 9600,
    autoOpen: false,
  });
};

const writeToKeyboard = async function (port: SerialPortStream, data: Buffer): Promise<boolean> {
  try {
    await port.write(data);
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};

const readFromKeyboard = async function (port: SerialPortStream, size?: number): Promise<Buffer> {
  if (size !== undefined) {
    return await port.read(size);
  }

  return await port.read();
};


export {
  createPort,
  writeToKeyboard,
  readFromKeyboard,
};
