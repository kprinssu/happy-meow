import { Cyberboard } from '../../parser/Cyberboard';
import { CyberboardConfig } from '../../parser/schema';
import { readJSON } from '../../parser/reader';
import { expectedPageControl } from './expectedData';

const validJsonConfig = readJSON('./src/keyboard/tests/parser/valid.json');

describe('Cyberboard', () => {
  describe('processes a valid config file', () => {
    test('it generates the unknown commands', async () => {
      const config =  await validJsonConfig;
      const parsedCyberboard = new Cyberboard(config);



      // console.log(parsedCyberboard.unknownInfos);
    });

    test('it generates the page control commands', async () => {
      const config =  await validJsonConfig;
      const parsedCyberboard = new Cyberboard(config);

      expect(parsedCyberboard.pageControlInfos).toEqual(expectedPageControl);
    });
  });
});
