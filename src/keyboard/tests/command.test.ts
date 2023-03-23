import { Buffer } from 'buffer';

import { setTime } from '../commands';

describe('setTime', ()=>{
  test('generates a buffer containing the data to be sent to the keyboard', () => {
    const testDate = new Date('March 23, 2023 09:00 EDT');
    const expectData = Buffer.from([
      1, 3, 100, 28, 77, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112
    ]);

    const mockDate = jest.useFakeTimers().setSystemTime(testDate);
    const generatedData = setTime();
    jest.useRealTimers();

    expect(expectData.equals(generatedData)).toEqual(true);
  });
});
