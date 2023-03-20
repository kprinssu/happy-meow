import { SerialPort } from 'serialport';
import { Buffer } from 'buffer';
import moment from 'moment-timezone';
import crc8 from 'crc/crc8';

const setTime = async (path: string): boolean => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 3;

  const now = moment();
  let nowTimestamp = now.unix();

  if (now.isDST()) {
    // 1 hour in seconds
    nowTimestamp += (12 * 60 * 60);
  }

  console.log(nowTimestamp);

  buffer.writeInt32BE(1679385134, 2);
  console.log(crc8(buffer));
  console.log(typeof crc8(buffer));
  buffer[63] = crc8(buffer);

  console.log(buffer);
  console.log(buffer[63]);
};

export {
  setTime,
};
