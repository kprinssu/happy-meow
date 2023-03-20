import { SerialPort } from 'serialport';
import { Buffer } from 'buffer';
import moment from 'moment-timezone';
import crc8 from 'crc/crc8';

import { createPort, writeToKeyboard } from './io';

const setTime = async (path: string): boolean => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 3;

  const now = moment();
  let nowTimestamp = now.unix();

  if (now.isDST()) {
    // 1 hour in seconds
    nowTimestamp -= (12 * 60 * 60);
  }

  buffer.writeInt32BE(nowTimestamp, 2);
  buffer[63] = crc8(buffer);

  const port = createPort(path);
  return await writeToKeyboard(port, buffer);
};

export {
  setTime,
};
