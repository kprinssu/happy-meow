import { MockBinding, MockPortBinding } from '@serialport/binding-mock';
import { SerialPortMock } from 'serialport';
import { randomBytes } from 'crypto'

import { createPort, writeToKeyboard, readFromKeyboard } from '../io';


jest.mock('serialport', () => {
  return {
    ...jest.requireActual('serialport'),
    SerialPort: jest.fn().mockImplementation((options) => new SerialPortMock(options)),
  };
});

const path = '/dev/CB00';
beforeEach(() => {
  MockBinding.reset();
  MockBinding.createPort(path, { echo: true, record: true });
});

describe('createPort', () => {
  test('creates a new SerialPort object', () => {
    const port = createPort(path);

    expect(port.path).toEqual(path);
    expect(port.baudRate).toEqual(9600);
  });
});

describe('writeToKeyboard', () => {

  test('writes data to the port and returns true for success', (done) => {
    const port = createPort(path);
    const data = randomBytes(32);

    port.on('open', async () => {
      const result = await writeToKeyboard(port, data);
      expect(result).toEqual(true);
    });

    port.on('readable', async () => {
      const readData = await port.read();
      expect(readData.equals(data)).toEqual(true);

      done();
    });

    port.open();
  });

  test('logs an error and returns false on failure', (done) => {
    const port = createPort(path);
    const data: any = null;
    port.open(async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { return {}; });

      const result = await writeToKeyboard(port, data);
      expect(result).toEqual(false);
      expect(errorSpy).toHaveBeenCalledWith('Failed to write data.');

      errorSpy.mockRestore();

      done();
    });
  });
});

describe('readFromKeyboard', () => {
  test('reads data from the keyboard with a size', (done) => {
    const port = createPort(path) as unknown as SerialPortMock;
    const readSize = 20;
    const data = randomBytes(32);
    const slicedData = data.slice(0, readSize);

    port.on('open', async () => {
      const mockPort = (port.port as unknown as MockPortBinding);
      mockPort.emitData(data);
    });

    port.on('readable', async () => {
      const readData = await readFromKeyboard(port, readSize);
      expect(readData.equals(slicedData)).toEqual(true);

      done();
    });

    port.open();
  });

  test('reads data from the keyboard with a fixed buffer size', (done) => {
    const port = createPort(path) as unknown as SerialPortMock;
    const data = randomBytes(32);

    port.on('open', async () => {
      const mockPort = (port.port as unknown as MockPortBinding);
      mockPort.emitData(data);
    });

    port.on('readable', async () => {
      const readData = await readFromKeyboard(port);
      expect(readData.equals(data)).toEqual(true);

      done();
    });

    port.open();
  });
});
