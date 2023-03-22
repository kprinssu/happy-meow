import { readJSON } from '../../parser';

describe('readJOSN', () => {
  test('successfully parses a valid Cyberboard JSON file', async () => {
    await expect(readJSON('./src/keyboard/tests/parser/valid.json')).resolves.not.toThrowError();
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
