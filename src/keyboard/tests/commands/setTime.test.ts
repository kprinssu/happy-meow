import { Buffer } from 'buffer';

import { generateSetTime } from '../../commands/setTime';

describe('generateSetTime', ()=>{
  test('generates a buffer containing the data to be sent to the keyboard', () => {
    const testDate = new Date('March 23, 2023 09:00 EDT');
    const expectedData = Buffer.from([
      1, 3, 100, 28, 77, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
    ]);

    jest.useFakeTimers().setSystemTime(testDate);
    const generatedData = generateSetTime();
    jest.useRealTimers();

    expect(generatedData).toEqual(expectedData);
  });
});
