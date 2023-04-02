import { Buffer } from 'buffer';

import { generateSetTime } from '../../commands/setTime';

describe('generateSetTime', ()=>{
  test('generates a buffer containing the data to be sent to the keyboard when it is daylight savings time', () => {
    const testDate = new Date('March 23, 2023 09:00:00 EDT');
    const expectedData = Buffer.from('0103641c5b6001050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007', 'hex');

    jest.useFakeTimers().setSystemTime(testDate);
    const generatedData = generateSetTime();
    jest.useRealTimers();

    expect(generatedData).toEqual(expectedData);
  });

  test('generates a buffer containing the data to be sent to the keyboard when it is not daylight savings time', () => {
    const testDate = new Date('Dec 23, 2023 09:00:00 EDT');
    const expectedData = Buffer.from('01036586d9d00105000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a', 'hex');

    jest.useFakeTimers().setSystemTime(testDate);
    const generatedData = generateSetTime();
    jest.useRealTimers();

    expect(generatedData).toEqual(expectedData);
  });
});
