import * as fs from 'fs/promises';
import { Buffer } from 'buffer';

import { Cyberboard } from './Cyberboard';
import { CyberboardConfig } from './schema';

export interface ParsedConfig {
  config: Cyberboard;
  processedValid: boolean[];
  customInterfaceFramesCount: number;
}

const countValidTypes = (json: any, config: Cyberboard): ParsedConfig => {
  const processedValid: boolean[] = [];
  const expectedKeys = [
    'valid',
    '//',
    'word_page',
    'frames',
    'keyframes',
  ];

  // This is Chinese for "Custom Interface"
  const tipsFlag = '自定义界面';

  let customInterfaceFramesCount = 0;

  for (const key of Object.keys(json)) {
    const child = json[key];

    if (child instanceof Array) {
      for (const elem of child) {
        const elemKeys = Object.keys(elem);

        const foundKeys = elemKeys.filter(k => expectedKeys.includes(k));

        if (foundKeys.length != expectedKeys.length) {
          continue;
        }

        const valid = elem['valid'];
        const tipsName = elem['//'];
        const wordPage = elem['word_page'];
        const frames = elem['frames'];
        const keyframes = elem['keyframes'];
        const checkTipFlag = tipsName.indexOf(tipsFlag) > -1;

        const wordPageValid = wordPage['valid'];
        const framesValid = frames['valid'];
        const keyframesValid = keyframes['valid'];

        if (checkTipFlag && framesValid) {
          customInterfaceFramesCount += 1;
        }

        if (keyframesValid) {
          customInterfaceFramesCount += 1;
        }

        processedValid.push(valid);
        processedValid.push(wordPageValid);
        processedValid.push(framesValid);
        processedValid.push(keyframesValid);
      }
    } else if (key == 'key_layer') {
      const keyLayerValid = child['valid'];
      processedValid.push(keyLayerValid);
    }
  }

  return {
    config: config,
    processedValid: processedValid,
    customInterfaceFramesCount: customInterfaceFramesCount,
  };
};

export const readJSON = async (path: string): Promise<ParsedConfig> => {
  const rawData: Buffer = await fs.readFile(path);
  const rawJSON: string = rawData.toString();
  const json: any = JSON.parse(rawJSON);
  const cyberboardSchema = await CyberboardConfig.parseAsync(json);
  const config = new Cyberboard(cyberboardSchema);
  const parsedConfig = countValidTypes(json, config);

  return parsedConfig;
};
