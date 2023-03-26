import { Buffer } from 'buffer';
import { crc8 } from 'crc';

import { Cyberboard } from '../parser';

const generateStartCommand = (): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 5;

  buffer[63] = crc8(buffer);
  return buffer;
};

const generateStopCommand = (frameCount: number): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 6;

  buffer.writeInt32BE(frameCount, 2);
  buffer[63] = crc8(buffer);
  return buffer;
};

export {
  generateStartCommand,
  generateStopCommand,
};
