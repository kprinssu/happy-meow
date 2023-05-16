import React from 'react';

import './Keyboard.css';
import Key, { KeyProps } from './Key';

import { KEYBOARD_CODE_TO_KEY } from '../../utils/keyboardKeys';

export interface KeyboardProps {
  keyProperties: KeyProps[];
}

const clickBootstrapHelper = (index: number, clickCallback: (index: number) => void) => {
  return () => clickCallback(index);
};

export const setupLedProperties = (leds: string[], clickCallback: (index: number) => void): KeyProps[] => {
  const keyProperties: KeyProps[] = [];

  leds.forEach((led: string, index: number) => {
    const keyProp: KeyProps = {
      label: '',
      value: index.toString(),
      led: led,
      clickFn: clickBootstrapHelper(index, clickCallback),
    };

    keyProperties.push(keyProp);
  });

  return keyProperties;
};

export const setupKeyProperties = (keys: string[], clickCallback: (index: number) => void): KeyProps[] => {
  const keyProperties: KeyProps[] = [];

  const noneKey = (key: string) => {
    if (key === '#000000') {
      return 'None';
    }

    return 'Unkn. Key';
  };

  keys.forEach((key: string, index: number) => {
    const label = KEYBOARD_CODE_TO_KEY(key);
    const keyProp: KeyProps = {
      label: label || noneKey(key),
      value: key,
      clickFn: clickBootstrapHelper(index, clickCallback),
    };

    keyProperties.push(keyProp);
  });

  return keyProperties;
};

export default (props: KeyboardProps) => {

  const isLed = props.keyProperties[0].led !== undefined;

  return (
    <div className="keyboard mt-2 text-base">
      <div className="keyboard-fn-row keyboard-row">
        <Key {...props.keyProperties[0]} style={{ 'marginLeft': '0', }} />
        <Key {...props.keyProperties[1]} style={{'marginLeft': '0.5em',}} />
        <Key {...props.keyProperties[2]} />
        <Key {...props.keyProperties[3]} />
        <Key {...props.keyProperties[4]} />
        <Key {...props.keyProperties[5]}  style={{'marginLeft': '0.5em',}} />
        <Key {...props.keyProperties[6]} />
        <Key {...props.keyProperties[7]} />
        <Key {...props.keyProperties[8]} />
        <Key {...props.keyProperties[9]}  style={{'marginLeft': '0.5em',}}  />
        <Key {...props.keyProperties[10]} />
        <Key {...props.keyProperties[11]} />
        <Key {...props.keyProperties[12]} />
        <Key {...props.keyProperties[13]}  style={{'marginLeft': '0.5em',}}  />
        <Key {...props.keyProperties[14]} />
      </div>
      <div className="keyboard-num-row keyboard-row">
        <Key {...(isLed ? props.keyProperties[15] : props.keyProperties[25])} style={{ 'marginLeft': '0', }} />
        <Key {...(isLed ? props.keyProperties[16] : props.keyProperties[26]) } />
        <Key {...(isLed ? props.keyProperties[17] : props.keyProperties[27]) } />
        <Key {...(isLed ? props.keyProperties[18] : props.keyProperties[28]) } />
        <Key {...(isLed ? props.keyProperties[19] : props.keyProperties[29]) } />
        <Key {...(isLed ? props.keyProperties[20] : props.keyProperties[30]) } />
        <Key {...(isLed ? props.keyProperties[21] : props.keyProperties[31]) } />
        <Key {...(isLed ? props.keyProperties[22] : props.keyProperties[32]) } />
        <Key {...(isLed ? props.keyProperties[23] : props.keyProperties[33]) } />
        <Key {...(isLed ? props.keyProperties[24] : props.keyProperties[34]) } />
        <Key {...(isLed ? props.keyProperties[25] : props.keyProperties[35]) } />
        <Key {...(isLed ? props.keyProperties[26] : props.keyProperties[36]) } />
        <Key {...(isLed ? props.keyProperties[27] : props.keyProperties[37]) } />
        <Key {...(isLed ? props.keyProperties[28] : props.keyProperties[38]) } size="2" />
        <Key {...(isLed ? props.keyProperties[29] : props.keyProperties[39]) } />
      </div>
      <div className="keyboard-qwerty-row keyboard-row">
        <Key {...(isLed ? props.keyProperties[30] : props.keyProperties[50])} style={{ 'marginLeft': '0', }} size="1.5" />
        <Key {...(isLed ? props.keyProperties[31] : props.keyProperties[51]) } />
        <Key {...(isLed ? props.keyProperties[32] : props.keyProperties[52]) } />
        <Key {...(isLed ? props.keyProperties[33] : props.keyProperties[53]) } />
        <Key {...(isLed ? props.keyProperties[34] : props.keyProperties[54]) } />
        <Key {...(isLed ? props.keyProperties[35] : props.keyProperties[55]) } />
        <Key {...(isLed ? props.keyProperties[36] : props.keyProperties[56]) } />
        <Key {...(isLed ? props.keyProperties[37] : props.keyProperties[57]) } />
        <Key {...(isLed ? props.keyProperties[38] : props.keyProperties[58]) } />
        <Key {...(isLed ? props.keyProperties[39] : props.keyProperties[59]) } />
        <Key {...(isLed ? props.keyProperties[40] : props.keyProperties[60]) } />
        <Key {...(isLed ? props.keyProperties[41] : props.keyProperties[61]) } />
        <Key {...(isLed ? props.keyProperties[42] : props.keyProperties[62]) } />
        <Key {...(isLed ? props.keyProperties[43] : props.keyProperties[63]) } size="1.5" />
        <Key {...(isLed ? props.keyProperties[44] : props.keyProperties[64]) } />
      </div>
      <div className="keyboard-caps-row keyboard-row">
        <Key {...(isLed ? props.keyProperties[45] : props.keyProperties[75])} style={{ 'marginLeft': '0', }} size="1.75" />
        <Key {...(isLed ? props.keyProperties[46] : props.keyProperties[76]) } />
        <Key {...(isLed ? props.keyProperties[47] : props.keyProperties[77]) } />
        <Key {...(isLed ? props.keyProperties[48] : props.keyProperties[78]) } />
        <Key {...(isLed ? props.keyProperties[49] : props.keyProperties[79]) } />
        <Key {...(isLed ? props.keyProperties[50] : props.keyProperties[80]) } />
        <Key {...(isLed ? props.keyProperties[51] : props.keyProperties[81]) } />
        <Key {...(isLed ? props.keyProperties[52] : props.keyProperties[82]) } />
        <Key {...(isLed ? props.keyProperties[53] : props.keyProperties[83]) } />
        <Key {...(isLed ? props.keyProperties[54] : props.keyProperties[84]) } />
        <Key {...(isLed ? props.keyProperties[55] : props.keyProperties[85]) } />
        <Key {...(isLed ? props.keyProperties[56] : props.keyProperties[86]) } />
        <Key {...(isLed ? props.keyProperties[58] : props.keyProperties[88]) } size="2.5" />
        <Key {...(isLed ? props.keyProperties[59] : props.keyProperties[89]) } />
      </div>
      <div className="keyboard-shift-row keyboard-row">
        <Key {...(isLed ? props.keyProperties[60] : props.keyProperties[100])} style={{ 'marginLeft': '0', }} size="2.5" />
        <Key {...(isLed ? props.keyProperties[62] : props.keyProperties[102]) } />
        <Key {...(isLed ? props.keyProperties[63] : props.keyProperties[103]) } />
        <Key {...(isLed ? props.keyProperties[64] : props.keyProperties[104]) }  />
        <Key {...(isLed ? props.keyProperties[65] : props.keyProperties[105]) } />
        <Key {...(isLed ? props.keyProperties[66] : props.keyProperties[106]) }  />
        <Key {...(isLed ? props.keyProperties[67] : props.keyProperties[107]) } />
        <Key {...(isLed ? props.keyProperties[68] : props.keyProperties[108]) } />
        <Key {...(isLed ? props.keyProperties[69] : props.keyProperties[109]) }/>
        <Key {...(isLed ? props.keyProperties[70] : props.keyProperties[110]) } />
        <Key {...(isLed ? props.keyProperties[71] : props.keyProperties[111]) } />
        <Key {...(isLed ? props.keyProperties[72] : props.keyProperties[112]) } size="1.75" />
        <Key {...(isLed ? props.keyProperties[73] : props.keyProperties[113]) } />
      </div>
      <div className="keyboard-ctrl-row keyboard-row">
        <Key {...(isLed ? props.keyProperties[75] : props.keyProperties[125])} style={{ 'marginLeft': '0', }}  size="1.25" />
        <Key {...(isLed ? props.keyProperties[76] : props.keyProperties[126]) } size="1.25" />
        <Key {...(isLed ? props.keyProperties[77] : props.keyProperties[127]) } size="1.25" />

        {
          // There are 3 LEDs under the spacebar
          isLed ? (
            <div className="flex">
              <Key {...props.keyProperties[79]} size="0.25" />
              <Key {...props.keyProperties[80]} size="6.75" />
              <Key {...props.keyProperties[81]} size="0.25" />
            </div>
          ) :
          (
            <Key {...props.keyProperties[131]} size="7.75" />
          )
        }

        <Key {...(isLed ? props.keyProperties[85] : props.keyProperties[135]) } size="1.25" />
        <Key {...(isLed ? props.keyProperties[86] : props.keyProperties[136]) } size="1.25" />
        <Key {...(isLed ? props.keyProperties[87] : props.keyProperties[137]) } style={{'marginLeft': '0.75em',}} />
        <Key {...(isLed ? props.keyProperties[88] : props.keyProperties[138]) } />
        <Key {...(isLed ? props.keyProperties[89] : props.keyProperties[139]) } />
      </div>
    </div>
  );
};
