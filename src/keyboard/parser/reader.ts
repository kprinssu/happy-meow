import * as fs from 'fs/promises';
import { Buffer } from 'buffer';

import { Cyberboard } from './Cyberboard';
import { CyberboardConfig } from './schema';


export const readJSON = async (path: string): Promise<Cyberboard> => {
  const rawData: Buffer = await fs.readFile(path);
  const rawJSON: string = rawData.toString();
  const json: any = JSON.parse(rawJSON);
  const cyberboardSchema = await CyberboardConfig.parseAsync(json);
  const config = new Cyberboard(cyberboardSchema);

  return config;
};
