import * as fs from 'fs/promises';
import { Buffer } from 'buffer';

import { Cyberboard } from './schema';

export const readJSON = async (path: string): Promise<Cyberboard> => {
  const rawData: Buffer = await fs.readFile(path);
  const rawJSON: string = rawData.toString();
  const json: any = JSON.parse(rawJSON);
  return await Cyberboard.parseAsync(json);
};
