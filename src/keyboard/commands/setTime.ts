import { Buffer } from 'buffer';
import { crc8 } from 'easy-crc';

export const generateSetTime = (): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 3;

  const now = new Date();
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  let utcOffset = now.getTimezoneOffset() / 60 * -1;
  const decimalOffset = Math.abs(utcOffset) % 1;
  let timestamp = unixTimestamp;

  if (decimalOffset !== 0) {
    const tenthDecimal = decimalOffset * 10;
    let seconds = tenthDecimal * 0.1;

    // Handle the case when there are two decimal places
    if ((tenthDecimal * 10) % 1 !== 0) {
      seconds = tenthDecimal * 0.01;
    }

    seconds = seconds * 3600;
    timestamp += seconds;
  }

  // Handle daylight savings time
  const january = new Date(now.getFullYear(), 0, 1);
  const july = new Date(now.getFullYear(), 6, 1);
  const isDst = now.getTimezoneOffset() < Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());

  if (isDst) {
    utcOffset = (utcOffset < 0) ? utcOffset - 1 : utcOffset + 1;
    timestamp += 3600;
  }

  buffer.writeInt32BE(timestamp, 2);
  if (utcOffset > 0) {
    buffer[6] = 0;
  } else if (utcOffset < 0) {
    buffer[6] = 1;
  } else {
    buffer[6] = 2;
  }

  buffer[7] = Math.abs(Math.trunc(utcOffset));

  const subarray = buffer.subarray(0, 63);
  buffer[63] = crc8('CRC-8', subarray);

  return buffer;
};
