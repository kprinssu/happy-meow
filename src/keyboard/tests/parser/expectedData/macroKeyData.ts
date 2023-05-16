import * as CyberboardTypes from '../../../parser/Cyberboard';

export const expectedMacroKeyData: CyberboardTypes.MacroKeyInfoCommand[] = [
  {
    MACRO_key_index: 0,
    input_key: '#00070013',
    out_key: [ '#00070013', '#00070014', '#00070015', '#00070016', '#00070017' ],
    intvel_ms: [ 0, 100, 100, 100, 100 ],
  },
  {
    MACRO_key_index: 1,
    input_key: '#00070014',
    out_key: [ '#00070013' ],
    intvel_ms: [ 0 ],
  },
  {
    MACRO_key_index: 2,
    input_key: '#00070015',
    out_key: [ '#00070013', '#00070014' ],
    intvel_ms: [ 0 ],
  }
];
