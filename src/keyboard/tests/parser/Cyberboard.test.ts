import {
  UnknownInfoCommand,
  FunctionKeyInfoCommand,
  SwapKeyInfoCommand
} from '../../parser/Cyberboard';
import { readJSON } from '../../parser/reader';
import { expectedPageControl,
  expectedWordPage,
  expectedExchaneKeyData,
  expectedTabKey,
  expectedMacroKeyData
} from './expectedData';

const validJsonConfig = readJSON('./src/keyboard/tests/_files_/valid.json');

describe('Cyberboard', () => {
  describe('processes a valid config file', () => {
    test('it generates the unknown infos', async () => {
      const parsedCyberboard =  (await validJsonConfig);

      const expectedData: UnknownInfoCommand[] = [
        { pageIndex: 0, wordNum: 0, frameNum: 0, keyframeNum: 0, },
        { pageIndex: 1, wordNum: 0, frameNum: 0, keyframeNum: 0, },
        { pageIndex: 2, wordNum: 0, frameNum: 0, keyframeNum: 0, },
        { pageIndex: 3, wordNum: 28, frameNum: 0, keyframeNum: 0, },
        { pageIndex: 4, wordNum: 0, frameNum: 0, keyframeNum: 0, },
        { pageIndex: 5, wordNum: 0, frameNum: 80, keyframeNum: 123, },
        { pageIndex: 6, wordNum: 0, frameNum: 79, keyframeNum: 42, },
        { pageIndex: 7, wordNum: 0, frameNum: 60, keyframeNum: 71, }
      ];

      expect(parsedCyberboard.unknownInfos).toEqual(expectedData);
    });

    test('it processes the page control', async () => {
      const parsedCyberboard = (await validJsonConfig);

      expect(parsedCyberboard.pageControlInfos).toEqual(expectedPageControl);
    });

    test('it processes the word page', async () => {
      const parsedCyberboard = (await validJsonConfig);

      expect(parsedCyberboard.wordPageInfos).toEqual(expectedWordPage);
    });

    test('it processes the RGB frames', async () => {
      const parsedCyberboard = (await validJsonConfig);

      // RGB Frames have binary data and hard to store the buffer data as JSON
      expect(parsedCyberboard.rgbFrameInfos.length).toEqual(2409);
    });

    test('it processes the keyframes', async () => {
      const parsedCyberboard = (await validJsonConfig);

      // Keyframes have binary data and hard to store the buffer data as JSON
      expect(parsedCyberboard.keyframeInfos.length).toEqual(1180);
    });

    test('it process the exchange keys', async () => {
      const parsedCyberboard = (await validJsonConfig);

      expect(parsedCyberboard.exchangeKeyInfos).toEqual(expectedExchaneKeyData);
    });

    test('it process the tab keys', async () => {
      const parsedCyberboard = (await validJsonConfig);

      expect(parsedCyberboard.tabKeyInfos).toEqual(expectedTabKey);
    });

    test('it process the function keys', async () => {
      const parsedCyberboard = (await validJsonConfig);

      const expectedData: FunctionKeyInfoCommand[] = [
        {
          functionKeyCount: 5,
          keyNumber: 5,
          functionKeys: [
            { Fn_key_index: 0, input_key: '#00070013', out_key: '#00070014', },
            { Fn_key_index: 1, input_key: '#00070014', out_key: '#00070015', },
            { Fn_key_index: 2, input_key: '#00070015', out_key: '#00070016', },
            { Fn_key_index: 3, input_key: '#00070016', out_key: '#00070017', },
            { Fn_key_index: 4, input_key: '#00070017', out_key: '#00070018', }
          ],
        }
      ];

      expect(parsedCyberboard.functionKeyInfos).toEqual(expectedData);
    });

    test('it process the Macro keys', async () => {
      const parsedCyberboard = (await validJsonConfig);

      expect(parsedCyberboard.macroKeyInfos).toEqual(expectedMacroKeyData);
    });

    test('it process the Swap keys', async () => {
      const parsedCyberboard = (await validJsonConfig);

      const expectedData: SwapKeyInfoCommand[] = [
        {
          swapKeyCount: 4,
          keyNumber: 4,
          swapKeys: [
            { swap_key_index: 0, input_key: '#00070004', out_key: '#00070005', },
            { swap_key_index: 1, input_key: '#00070005', out_key: '#00070004', },
            { swap_key_index: 2, input_key: '#00070007', out_key: '#00070008', },
            { swap_key_index: 3, input_key: '#00070008', out_key: '#00070009', }
          ],
        }
      ];

      expect(parsedCyberboard.swapKeyInfos).toEqual(expectedData);
    });

    test('it process the key layer', async () => {
      const parsedCyberboard = (await validJsonConfig);

      expect(parsedCyberboard.keyLayerInfos.length).toEqual(27);
    });
  });
});
