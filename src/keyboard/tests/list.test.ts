import { SerialPort } from 'serialport';
import { PortInfo } from '@serialport/bindings-cpp';

import { listKeyboards } from '../list';

const mockCyberboard: PortInfo = {
  path: '/dev/CB00',
  manufacturer: 'Happy Meow',
  serialNumber: '',
  pnpId: '',
  locationId: 'TEST_DEVICE',
  vendorId: '05ac',
  productId: '0256',
};

const mockDevice: PortInfo = {
  path: '/dev/RND0',
  manufacturer: 'Happy Meow',
  serialNumber: '',
  pnpId: '',
  locationId: 'TEST_DEVICE',
  vendorId: 'abc1',
  productId: 'def2',
};


describe('listKeyboards', () => {
  test('finds a Cyberboard', async () => {
        const mockPorts: PortInfo[] = [mockCyberboard, mockDevice];
    jest.spyOn(SerialPort, 'list').mockImplementation(() => Promise.resolve<PortInfo[]>(mockPorts));
    const result = await listKeyboards();
    expect(result).toStrictEqual([mockCyberboard]);
  });

  test('does not find a Cyberboard', async () => {
    jest.spyOn(SerialPort, 'list').mockImplementation(() => Promise.resolve<PortInfo[]>([mockDevice]));
    const result = await listKeyboards();
    expect(result.length).toBe(0);
  });
});
