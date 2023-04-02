import { SerialPort } from 'serialport';
import { SerialPortStream } from '@serialport/stream';
import { Buffer } from 'buffer';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const createPort = (path: string): SerialPort => {
  return new SerialPort({
    path: path,
    baudRate: 9600,
    autoOpen: false,
  });
};

const writeToKeyboard = async (port: SerialPortStream, data: Buffer): Promise<boolean> => {
  try {
    await sleep(2);
    await new Promise<void>((resolve, reject) => {
      port.write(data, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  } catch (e) {
    console.error('Failed to write data.');
    console.error(e);
    return false;
  }

  return true;
};

const readFromKeyboard = async (port: SerialPortStream, size?: number): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      port.on('data', (data) => {
        if (size !== undefined) {
          data = data.subarray(0, size);
        }
        resolve(data);
      });
    } catch (e) {
      reject(e);
    }
  });
};


export {
  createPort,
  writeToKeyboard,
  readFromKeyboard,
};
