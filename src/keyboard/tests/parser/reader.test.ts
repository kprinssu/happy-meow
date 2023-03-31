import { Cyberboard } from '../../parser/Cyberboard';
import { readJSON } from '../../parser';

describe('readJOSN', () => {
  test('successfully parses a valid Cyberboard JSON file', async () => {
    await expect(readJSON('./src/keyboard/tests/parser/valid.json')).resolves.not.toThrowError();

    const parsedConfig = await readJSON('./src/keyboard/tests/parser/valid.json');
    expect(parsedConfig.config instanceof Cyberboard).toEqual(true);
    expect(parsedConfig.processedValid).toEqual([true, false, false, false, true, false, false, false, true,
      false, false, false, false, true, false, false, false, false, false, false, true,
      false, true, true, true, false, true, true, true, false, true, true, true]);
    expect(parsedConfig.customInterfaceFramesCount).toEqual(6);
  });

  test('throws a file error for an invalid path', async () => {
    try {
     await readJSON('./doesNotExist.json');
    } catch (e: any) {
      expect(e.code).toEqual('ENOENT');
    }
  });

  test('throws a parsing error for a invalid JSON file', async () => {
    await expect(readJSON('./src/keyboard/tests/parser/invalid.json')).rejects.toThrowError();
  });
});