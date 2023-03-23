import { Buffer } from 'buffer';
import { crc8 } from 'crc';

const generateSetTime = (): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 3;

  const nowTimestamp = Math.floor(new Date().getTime() / 1000);

  buffer.writeInt32BE(nowTimestamp, 2);
  buffer[63] = crc8(buffer);

  return buffer;
};

export {
  generateSetTime,
};
