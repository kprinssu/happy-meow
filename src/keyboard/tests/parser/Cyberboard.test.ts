import { Cyberboard } from '../../parser/Cyberboard';
import { readJSON } from '../../parser/reader';
import { expectedPageControl,
  expectedWordPage,
  expectedExchaneKeyData,
  expectedTabKey,
  expectedMacroKeyData,
} from './expectedData';

const validJsonConfig = readJSON('./src/keyboard/tests/parser/valid.json');

describe('Cyberboard', () => {
  describe('processes a valid config file', () => {
    test('it generates the unknown infos', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      // console.log(parsedCyberboard.unknownInfos);
    });

    test('it processes the page control', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      expect(parsedCyberboard.pageControlInfos).toEqual(expectedPageControl);
    });

    test('it processes the word page', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      expect(parsedCyberboard.wordPageInfos).toEqual(expectedWordPage);
    });

    test('it processes the RGB frames', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      // RGB Frames have binary data and hard to store the buffer data as JSON
      expect(parsedCyberboard.rgbFrameInfos.length).toEqual(219);
    });

    test('it processes the keyframes', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      // Keyframes have binary data and hard to store the buffer data as JSON
      expect(parsedCyberboard.keyframeInfos.length).toEqual(236);
    });

    test('it process the exchange keys', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      expect(parsedCyberboard.exchangeKeyInfos).toEqual(expectedExchaneKeyData);
    });

    test('it process the tab keys', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      expect(parsedCyberboard.tabKeyInfos).toEqual(expectedTabKey);
    });

    test('it process the function keys', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      // console.log(parsedCyberboard.functionKeyInfos)
    });

    test('it process the Macro keys', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      expect(parsedCyberboard.macroKeyInfos).toEqual(expectedMacroKeyData);
    });

    test('it process the Swap keys', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

    });

    test('it process the key layer', async () => {
      const config =  (await validJsonConfig).config;
      const parsedCyberboard = config;

      expect(parsedCyberboard.keyLayerInfos.length).toEqual(27);
    });
  });
});
