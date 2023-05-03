 import { KEYBOARD_KEYS, KEYBOARD_CODE_TO_KEY } from '../keyboardKeys';

describe('KEYBOARD_KEYS', () => {
  // This test is just to make sure that the KEYBOARD_KEYS object is not empty
  it('should have at least one key', () => {
    expect(Object.keys(KEYBOARD_KEYS).length).toBeGreaterThan(0);
  });
});

describe('KEYBOARD_CODE_TO_KEY', () => {
  it('should return the correct key name given the raw value', () => {
    const expected = 'Esc';
    const result = KEYBOARD_CODE_TO_KEY('#00070029');
    expect(result).toEqual(expected);
  });

  it('should return the correct key name given the code is in lower case', () => {
    const expected = 'F1';
    const result = KEYBOARD_CODE_TO_KEY('#0007003a');
    expect(result).toEqual(expected);
  });

  it('should return the correct key name given the code is in upper case', () => {
    const expected = 'F1';
    const result = KEYBOARD_CODE_TO_KEY('#0007003A');
    expect(result).toEqual(expected);
  });

  it('should return null if the raw value is not found', () => {
    const expected = null;
    const result = KEYBOARD_CODE_TO_KEY('foo-bar-baz');
    expect(result).toEqual(expected);
  });
});
