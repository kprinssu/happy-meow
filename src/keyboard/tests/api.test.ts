import { MockBinding } from '@serialport/binding-mock';
import { SerialPortMock } from 'serialport';
import { Buffer } from 'buffer';
import * as fs from 'fs';

import { KeyboardApi } from '../api';

const portPath = '/dev/CB00';
let mockPort: SerialPortMock | null = null;
jest.mock('serialport', () => {
  return {
    ...jest.requireActual('serialport'),
    SerialPort: jest.fn().mockImplementation(() => mockPort),
  };
});

const mockGenerateTime = Buffer.from('01036428d0e701050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000065', 'hex');
jest.mock('../commands/setTime', () => ({
  generateSetTime: jest.fn().mockImplementation(() => {
    return mockGenerateTime;
  }),
}));

const setupMockPort = () => {
  MockBinding.reset();
  MockBinding.createPort(portPath, { echo: true, record: true, });
  mockPort = new SerialPortMock({ path: portPath, baudRate: 9600, autoOpen: false, });
};

describe('setTime', () => {
  test('it writes the time to the keyboard', async () => {
    setupMockPort();

    const expectedData = mockGenerateTime;
    await KeyboardApi.setTime(portPath);

    expect(mockPort?.port?.recording).toEqual(expectedData);
  });
});

describe('writeConfig', () => {
  test('it writes the config to the keyboard', async () => {
    setupMockPort();

    const expectedData = fs.readFileSync('./src/keyboard/tests/_files_/writeConfig.bin');

    await KeyboardApi.writeConfig(portPath, './src/keyboard/tests/_files_/valid.json');
    expect(mockPort?.port?.recording?.equals(expectedData)).toEqual(true);
  }, 10000);
});
