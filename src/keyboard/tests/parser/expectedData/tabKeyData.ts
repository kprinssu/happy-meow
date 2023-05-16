import * as CyberboardTypes from '../../../parser/Cyberboard';

export const expectedTabKey: CyberboardTypes.TabKeyInfoCommand[] = [
  {
    ta_key_index: 0,
    key_value: '#0007000B',
    single_key_out: [ '#0007000B' ],
    double_key_out: [ '#0007000C' ],
    three_key_out: [ '#0007000D' ],
    long_key_out: [ '#0007000E' ],
  },
  {
    ta_key_index: 1,
    key_value: '#0007000F',
    single_key_out: [ '#0007000F' ],
    double_key_out: [ '#00070010' ],
    three_key_out: [ '#0007011' ],
    long_key_out: [ '#00070012' ],
  }
];
