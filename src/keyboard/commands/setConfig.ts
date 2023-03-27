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

const generateUnknownInfoCommand = (pageNum: number, config: Cyberboard): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 2;
  buffer[1] = 1;
  buffer[2] = pageNum;

  let index = 0;
  for (let i = 0; i < config.unknownInfos.length; i++) {
    const unknownInfo = config.unknownInfos[i];

    buffer[index] = unknownInfo.pageIndex;
    buffer[index + 1] = unknownInfo.wordNum;
    buffer.writeInt16BE(unknownInfo.frameNum, index + 2);
    buffer.writeInt16BE(unknownInfo.keyframeNum, index + 4);
    index += 6;
  }

  buffer[63] = crc8(buffer);
  return buffer;
};

const generatePageControlInfoCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.pageControlInfos; i++) {
    const pageControlInfo = config.pageControlInfos[i];

    Buffer.alloc(64);
    buffer[0] = 2;
    buffer[1] = 2;
    buffer[2] = pageControlInfo.usbFrameCount;
    buffer[3] = pageControlInfo.usbFrameIndex;
    buffer[4] = pageControlInfo.pageNum;

    let index = 5;
    for (let j = 0; j < pageControlInfo.controlInfos; j++) {
      const controlInfo = pageControlInfo.controlInfos[j];

      buffer[index] = controlInfo.valid ? 1 : 0;
      buffer[index + 1] = controlInfo.pageIndex;
      buffer[index + 2] = controlInfo.brightness;
      buffer.writeInt16BE(controlInfo.speed, index + 3);
      index += 5;

      const color = controlInfo.color;
      buffer[index] = color.default;
      index += 1;

      const backRgb = Buffer.from(color.back_rgb.substring(1), 'hex');
      backRgb.copy(buffer, index);
      index += 3;

      const rgb = Buffer.from(color.rgb.substring(1), 'hex');
      rgb.copy(buffer, index);
      index += 3;
    }

    buffer[63] = crc8(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateWordInfoCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.wordPageInfos.length; i++) {
    const wordPageInfo = config.wordPageInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 3;
    buffer[1] = 1;
    buffer[2] = wordPageInfo.frameIndex;
    buffer[3] = wordPageInfo.pageIndex;
    buffer[4] = wordPageInfo.valid ? 1 : 0;
    buffer[5] = wordPageInfo.wordLen;

    let index = 6;
    for (let j = 0; j < wordPageInfo.unicode; j++) {
      const unicode = wordPageInfo.unicode[j];
      const unicodeData = Buffer.from(unicode.substring(1), 'hex');
      unicodeData.copy(buffer, index);

      index += 2;
    }

    buffer[63] = crc8(buffer);
    buffers.push(buffer);
  }

  return buffers;
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
  generateUnknownInfoCommand,
  generatePageControlInfoCommands,
  generateWordInfoCommands,
  generateStopCommand,
};
