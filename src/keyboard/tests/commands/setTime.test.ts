import { Buffer } from 'buffer';

import { generateSetTime } from '../../commands/setTime';

describe('generateSetTime', ()=>{
  test('generates a buffer containing the data to be sent to the keyboard when it is daylight savings time', () => {
    const testDate: Date = new Date('March 23, 2022 09:00:00 PDT');
    const expectedData = Buffer.from('0103623b440001040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000089', 'hex');

    const spy = jest.spyOn(global, 'Date').mockImplementation(() => testDate);
    const generatedData = generateSetTime();
    spy.mockRestore();

    expect(generatedData).toEqual(expectedData);
  });

  test('generates a buffer containing the data to be sent to the keyboard when it is not daylight savings time', () => {
    const testDate = new Date('Dec 23, 2022 09:00:00 PDT');
    const expectedData = Buffer.from('010363a5d0800105000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008d', 'hex');

    const spy = jest.spyOn(global, 'Date').mockImplementation(() => testDate);
    const generatedData = generateSetTime();
    spy.mockRestore();

    expect(generatedData).toEqual(expectedData);
  });
});
