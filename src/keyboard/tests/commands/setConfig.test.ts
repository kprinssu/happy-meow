import { Buffer } from 'buffer';

import { generateStartCommand, generateStopCommand } from '../../commands/setConfig';

describe('generateStartCommand', () => {
  test('it generates a buffer containing the start command', () => {
    const expectData = Buffer.from([
      1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97
    ]);

    const generatedData = generateStartCommand();
    expect(expectData).toEqual(generatedData);
  });
});

describe('generateStopCommand', () => {
  test('it generates a buffer containing the stop command', () => {
    const frameCount = 100;
    const expectData = Buffer.from([
      1, 6, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 189
    ]);

    const generatedData = generateStopCommand(frameCount);
    expect(expectData).toEqual(generatedData);
  });
});

