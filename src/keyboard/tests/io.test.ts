import { MockBinding } from '@serialport/binding-mock';
import { SerialPort, SerialPortMock } from 'serialport';
import { Buffer } from 'buffer';

import { createPort, writeToKeyboard, readFromKeyboard } from '../io';

const path = '/dev/CB00';

jest.mock('serialport', () => {
  return {
    ...jest.requireActual('serialport'),
    SerialPort: jest.fn().mockImplementation((options) => new SerialPortMock(options)),
  };
});

describe('createPort', () => {
  test('creates a new SerialPort object', () => {
    const port = createPort(path);

    expect(port.path).toEqual(path);
    expect(port.baudRate).toEqual(9600);
  });
});

describe('writeToKeyboard', () => {
  beforeEach(() => {
    MockBinding.reset();
    MockBinding.createPort(path, { echo: false, record: true });
  });

  test('writes data to the port and returns true for success', async () => {
    const port = createPort(path);
    const data = Buffer.alloc(8);
    port.open();

    const result = await writeToKeyboard(port, data);
    expect(result).toEqual(true);
  });

  test('logs an error and returns false on failure', () => {
    const port = createPort(path);
  });
});

