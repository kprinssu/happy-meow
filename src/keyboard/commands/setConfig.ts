import { Buffer } from 'buffer';
import { crc8 } from 'easy-crc';

import { Cyberboard } from '../parser';

const generateChecksum = (buffer: Buffer): number => {
  const subarray = buffer.subarray(0, 63);
  return crc8('CRC-8', subarray);
};

const generateCheckPageCommand = (): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 2;
  buffer[1] = 6;

  buffer[63] = generateChecksum(buffer);
  return buffer;
};

const generateUsefulDirectives = (pageCount: number, processedValids: boolean[]) => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 2;
  buffer[1] = 5;
  buffer[2] = pageCount;

  for (let i = 0; i < processedValids.length; i++) {
    buffer[i + 3] = processedValids[i] ? 1 : 0;
  }

  buffer[63] = generateChecksum(buffer);
  return buffer;
};

const generateStartCommand = (): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 5;

  buffer[63] = generateChecksum(buffer);
  return buffer;
};

const generateUnknownInfoCommand = (config: Cyberboard): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 2;
  buffer[1] = 1;
  buffer[2] = config.config.page_num;

  let index = 3;
  for (let i = 0; i < config.unknownInfos.length; i++) {
    const unknownInfo = config.unknownInfos[i];

    buffer[index] = unknownInfo.pageIndex;
    buffer[index + 1] = unknownInfo.wordNum;
    buffer.writeInt16LE(unknownInfo.frameNum, index + 2);
    buffer.writeInt16LE(unknownInfo.keyframeNum, index + 4);
    index += 6;
  }

  buffer[63] = generateChecksum(buffer);
  return buffer;
};

const generatePageControlInfoCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.pageControlInfos.length; i++) {
    const pageControlInfo = config.pageControlInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 2;
    buffer[1] = 2;
    buffer[2] = pageControlInfo.usbFrameCount;
    buffer[3] = pageControlInfo.usbFrameIndex;
    buffer[4] = pageControlInfo.pageNum;

    let index = 5;
    for (let j = 0; j < pageControlInfo.controlInfos.length; j++) {
      const controlInfo = pageControlInfo.controlInfos[j];

      buffer[index] = controlInfo.valid ? 1 : 0;
      buffer[index + 1] = controlInfo.pageIndex;
      buffer[index + 2] = controlInfo.brightness;
      buffer.writeInt16LE(controlInfo.speed, index + 3);
      index += 5;

      const color = controlInfo.color;
      buffer[index] = color.default ? 1 : 0;
      index += 1;

      const backRgb = Buffer.from(color.back_rgb.substring(1), 'hex');
      backRgb.copy(buffer, index);
      index += 3;

      const rgb = Buffer.from(color.rgb.substring(1), 'hex');
      rgb.copy(buffer, index);
      index += 3;
    }

    buffer[63] = generateChecksum(buffer);
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
    for (let j = 0; j < wordPageInfo.unicode.length; j++) {
      const unicode = wordPageInfo.unicode[j];
      const unicodeData = Buffer.from(unicode.substring(1), 'hex');
      unicodeData.copy(buffer, index);

      index += 2;
    }

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateRgbFrameCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.rgbFrameInfos.length; i++) {
    const rgbFrame = config.rgbFrameInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 4;
    buffer[1] = rgbFrame.pageIndex;
    buffer.writeInt16LE(rgbFrame.frameIndex, 2);
    buffer[4] = rgbFrame.usbFrameIndex;
    rgbFrame.frameRgb.copy(buffer, 5);

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateKeyframeCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.keyframeInfos.length; i++) {
    const keyframe = config.keyframeInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 5;
    buffer[1] = keyframe.pageIndex;
    buffer[2] = keyframe.frameIndex;
    buffer[3] = keyframe.usbFrameIndex;
    keyframe.frameRgb.copy(buffer, 4);

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateExchangeKeyCommands = (config: Cyberboard): Buffer[] => {
    const buffers: Buffer[] = [];

  for (let i = 0; i < config.exchangeKeyInfos.length; i++) {
    const exchangeKey = config.exchangeKeyInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 6;
    buffer[1] = 1;
    buffer[2] = config.config.exchange_num;
    buffer[3] = exchangeKey.exchange_index;

    let index = 4;
    for (let j = 0; j < exchangeKey.input_key.length; j++) {
      const inputkey = exchangeKey.input_key[j];
      const inputKeyBuffer = Buffer.from(inputkey.substring(1), 'hex');
      inputKeyBuffer.copy(buffer, index);
      index += 4;
    }

    index = 24;
    for (let j = 0; j < exchangeKey.out_key.length; j++) {
      const outputkey = exchangeKey.out_key[j];
      const outputputKeyBuffer = Buffer.from(outputkey.substring(1), 'hex');
      outputputKeyBuffer.copy(buffer, index);
      index += 4;
    }

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateTabKeyCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.tabKeyInfos.length; i++) {
    const tabKey = config.tabKeyInfos[i];
    const keyValue = tabKey.key_value;
    const keyValueBuffer = Buffer.from(keyValue.substring(1), 'hex');

    // There are two buffers for every tab key
    const buffer1 = Buffer.alloc(64);
    buffer1[0] = 6;
    buffer1[1] = 2;
    buffer1[2] = config.tabKeyInfos.length;
    buffer1[3] = tabKey.ta_key_index;
    keyValueBuffer.copy(buffer1, 4);

    let index = 9;
    for (let j = 0; j < tabKey.single_key_out.length; j++) {
      const key = tabKey.single_key_out[j];
      const keyBuffer = Buffer.from(key.substring(1), 'hex');
      keyBuffer.copy(buffer1, index);
      index += 4;
    }

    index = 29;
    for (let j = 0; j < tabKey.double_key_out.length; j++) {
      const key = tabKey.double_key_out[j];
      const keyBuffer = Buffer.from(key.substring(1), 'hex');
      keyBuffer.copy(buffer1, index);
      index += 4;
    }

    buffer1[63] = generateChecksum(buffer1);
    buffers.push(buffer1);

    // The 2nd buffer
    const buffer2 = Buffer.alloc(64);
    buffer2[0] = 6;
    buffer2[1] = 3;
    buffer2[2] = config.tabKeyInfos.length;
    buffer2[3] = tabKey.ta_key_index;
    keyValueBuffer.copy(buffer2, 4);

    index = 9;
    for (let j = 0; j < tabKey.single_key_out.length; j++) {
      const key = tabKey.single_key_out[j];
      const keyBuffer = Buffer.from(key.substring(1), 'hex');
      keyBuffer.copy(buffer2, index);
      index += 4;
    }

    index = 29;
    for (let j = 0; j < tabKey.double_key_out.length; j++) {
      const key = tabKey.double_key_out[j];
      const keyBuffer = Buffer.from(key.substring(1), 'hex');
      keyBuffer.copy(buffer2, index);
      index += 4;
    }

    buffer2[63] = generateChecksum(buffer2);
    buffers.push(buffer2);
  }

  return buffers;
};

const generateFunctionKeyCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.functionKeyInfos.length; i++) {
    const functionKey = config.functionKeyInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 6;
    buffer[1] = 4;
    buffer[2] = functionKey.functionKeyCount;
    buffer[3] = functionKey.keyNumber;

    let index = 4;
    for (let j = 0; j < functionKey.functionKeys.length; j++) {
      const key = functionKey.functionKeys[j];
      const inKeyBuffer = Buffer.from(key.input_key.substring(1), 'hex');
      const outKeyBuffer = Buffer.from(key.out_key.substring(1), 'hex');

      buffer[index] = key.Fn_key_index;
      index += 1;
      inKeyBuffer.copy(buffer, index);
      index += 4;
      outKeyBuffer.copy(buffer, index);
      index += 4;
    }

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateMacroKeyCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.macroKeyInfos.length; i++) {
    const macroKey = config.macroKeyInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 6;
    buffer[1] = 5;
    buffer[2] = config.macroKeyInfos.length;
    buffer[3] = macroKey.MACRO_key_index;

    let index = 4;
    const inKeyBuffer = Buffer.from(macroKey.input_key.substring(1), 'hex');
    inKeyBuffer.copy(buffer, index);
    index += 4;

    for (let j = 0; j < macroKey.out_key.length; j++) {
      const outKeyBuffer = Buffer.from(macroKey.out_key[j].substring(1), 'hex');
      outKeyBuffer.copy(buffer, index);
      index += 4;
    }

    for (let j = 0; j < macroKey.intvel_ms.length; j++) {
      const speed = macroKey.intvel_ms[j];
      buffer.writeInt16LE(speed, index);
      index += 2;
    }

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateSwapKeyCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.swapKeyInfos.length; i++) {
    const swapKey = config.swapKeyInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 6;
    buffer[1] = 6;
    buffer[2] = swapKey.swapKeyCount;
    buffer[3] = swapKey.keyNumber;

    let index = 4;
    for (let j = 0; j < swapKey.swapKeys.length; j++) {
      const key = swapKey.swapKeys[j];

      const inKeyBuffer = Buffer.from(key.input_key.substring(1), 'hex');
      const outKeyBuffer = Buffer.from(key.out_key.substring(1), 'hex');

      buffer[index] = key.swap_key_index;
      index += 1;
      inKeyBuffer.copy(buffer, index);
      index += 4;
      outKeyBuffer.copy(buffer, index);
      index += 4;
    }

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateKeyLayerControlCommand = (config: Cyberboard): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 6;
  buffer[1] = 8;
  buffer[2] = config.config.key_layer.layer_num;

  buffer[63] = generateChecksum(buffer);
  return buffer;
};

const generateKeyLayerCommands = (config: Cyberboard): Buffer[] => {
  const buffers: Buffer[] = [];

  for (let i = 0; i < config.keyLayerInfos.length; i++) {
    const keyLayerInfo = config.keyLayerInfos[i];

    const buffer = Buffer.alloc(64);
    buffer[0] = 6;
    buffer[1] = 7;
    buffer[2] = keyLayerInfo.usbFrameIndex;
    keyLayerInfo.layerBytes.copy(buffer, 3);

    buffer[63] = generateChecksum(buffer);
    buffers.push(buffer);
  }

  return buffers;
};

const generateStopCommand = (frameCount: number): Buffer => {
  const buffer = Buffer.alloc(64);
  buffer[0] = 1;
  buffer[1] = 6;

  buffer.writeInt32BE(frameCount, 2);
  buffer[63] = generateChecksum(buffer);
  return buffer;
};

export {
  generateCheckPageCommand,
  generateUsefulDirectives,
  generateStartCommand,
  generateUnknownInfoCommand,
  generatePageControlInfoCommands,
  generateWordInfoCommands,
  generateRgbFrameCommands,
  generateKeyframeCommands,
  generateExchangeKeyCommands,
  generateTabKeyCommands,
  generateFunctionKeyCommands,
  generateMacroKeyCommands,
  generateSwapKeyCommands,
  generateKeyLayerControlCommand,
  generateKeyLayerCommands,
  generateStopCommand
};
