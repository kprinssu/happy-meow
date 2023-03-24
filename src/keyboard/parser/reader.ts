import * as fs from 'fs/promises';
import { Buffer } from 'buffer';

import { CyberboardConfig } from './schema';

export const readJSON = async (path: string): Promise<CyberboardConfig> => {
  const rawData: Buffer = await fs.readFile(path);
  const rawJSON: string = rawData.toString();
  const json: any = JSON.parse(rawJSON);
  return await CyberboardConfig.parseAsync(json);
};
