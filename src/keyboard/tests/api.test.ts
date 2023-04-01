import { MockBinding } from '@serialport/binding-mock';
import { SerialPortMock } from 'serialport';
import { Buffer } from 'buffer';
import * as fs from 'fs';

import { createPort } from '../io';
import { KeyboardApi } from '../api';

const portPath = '/dev/CB00';
let mockPort: SerialPortMock | null = null;
jest.mock('serialport', () => {
  return {
    ...jest.requireActual('serialport'),
    SerialPort: jest.fn().mockImplementation((options) => mockPort),
  };
});


const setupMockPort = () => {
  MockBinding.reset();
  MockBinding.createPort(portPath, { echo: true, record: true });
  mockPort = new SerialPortMock({ path: portPath, baudRate: 9600, autoOpen: false });
};

describe('setTime', () => {
  test('it writes the time to the keyboard', async () => {
    setupMockPort();

    //const expectedData = fs.readFileSync('./src/keyboard/tests/_files_/setTime.bin');

    await KeyboardApi.setTime(portPath);
    // /expect(mockPort?.port?.recording?.equals(expectedData)).toEqual(true);
  });
});

describe('writeConfig', () => {
  test('it writes the config to the keyboard', async () => {
    setupMockPort();

    const expectedData = fs.readFileSync('./src/keyboard/tests/_files_/writeConfig.bin');

    await KeyboardApi.writeConfig(portPath, './src/keyboard/tests/_files_/valid.json');
    expect(mockPort?.port?.recording?.equals(expectedData)).toEqual(true);
  }, 30000);
});
