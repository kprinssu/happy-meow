import React from 'react';

import './Keyboard.css';
import Key, { KeyProps } from './Key';

import { KEYBOARD_CODE_TO_KEY } from '../../utils/keyboardKeys';

export interface KeyboardProps {
  keyProperties: KeyProps[];
}

export const setupKeyProperties = (keys: string[]): KeyProps[] => {
  const keyProperties: KeyProps[] = [];

  keys.forEach((key: string) => {
    const label = KEYBOARD_CODE_TO_KEY(key);
    const keyProp: KeyProps = {
      label: label || 'Unkn. Key',
      value: key,
    };

    keyProperties.push(keyProp);
  });

  return keyProperties;
};

export default (props: KeyboardProps) => {

  return (
    <div className="keyboard mt-2">
      <div className="keyboard-fn-row keyboard-row">
        <Key {...props.keyProperties[0]} />
        <Key {...props.keyProperties[1]} style={{'marginLeft': '0.5em'}} />
        <Key {...props.keyProperties[2]} />
        <Key {...props.keyProperties[3]} />
        <Key {...props.keyProperties[4]} />
        <Key {...props.keyProperties[5]}  style={{'marginLeft': '0.5em'}} />
        <Key {...props.keyProperties[6]} />
        <Key {...props.keyProperties[7]} />
        <Key {...props.keyProperties[8]} />
        <Key {...props.keyProperties[9]}  style={{'marginLeft': '0.5em'}}  />
        <Key {...props.keyProperties[10]} />
        <Key {...props.keyProperties[11]} />
        <Key {...props.keyProperties[12]} />
        <Key {...props.keyProperties[13]}  style={{'marginLeft': '0.5em'}}  />
        <Key {...props.keyProperties[14]} />
      </div>
      <div className="keyboard-num-row keyboard-row">
        <Key {...props.keyProperties[25]} />
        <Key {...props.keyProperties[26]} />
        <Key {...props.keyProperties[27]} />
        <Key {...props.keyProperties[28]} />
        <Key {...props.keyProperties[29]} />
        <Key {...props.keyProperties[30]} />
        <Key {...props.keyProperties[31]} />
        <Key {...props.keyProperties[32]} />
        <Key {...props.keyProperties[33]} />
        <Key {...props.keyProperties[34]} />
        <Key {...props.keyProperties[35]} />
        <Key {...props.keyProperties[36]} />
        <Key {...props.keyProperties[37]} />
        <Key {...props.keyProperties[38]} size="2" />
        <Key {...props.keyProperties[39]} />
      </div>
      <div className="keyboard-qwerty-row keyboard-row">
        <Key {...props.keyProperties[50]} size="1.5" />
        <Key {...props.keyProperties[51]} />
        <Key {...props.keyProperties[52]} />
        <Key {...props.keyProperties[53]} />
        <Key {...props.keyProperties[54]} />
        <Key {...props.keyProperties[55]} />
        <Key {...props.keyProperties[56]} />
        <Key {...props.keyProperties[57]} />
        <Key {...props.keyProperties[58]} />
        <Key {...props.keyProperties[59]} />
        <Key {...props.keyProperties[60]} />
        <Key {...props.keyProperties[61]} />
        <Key {...props.keyProperties[62]} />
        <Key {...props.keyProperties[63]} size="1.5" />
        <Key {...props.keyProperties[64]} />
      </div>
      <div className="keyboard-caps-row keyboard-row">
        <Key {...props.keyProperties[75]} size="1.75" />
        <Key {...props.keyProperties[76]} />
        <Key {...props.keyProperties[77]} />
        <Key {...props.keyProperties[78]} />
        <Key {...props.keyProperties[79]} />
        <Key {...props.keyProperties[80]} />
        <Key {...props.keyProperties[81]} />
        <Key {...props.keyProperties[82]} />
        <Key {...props.keyProperties[83]} />
        <Key {...props.keyProperties[84]} />
        <Key {...props.keyProperties[85]} />
        <Key {...props.keyProperties[86]} />
        <Key {...props.keyProperties[88]} size="2.5" />
        <Key {...props.keyProperties[89]} />
      </div>
      <div className="keyboard-shift-row keyboard-row">
        <Key {...props.keyProperties[100]} size="2.5" />
        <Key {...props.keyProperties[102]} />
        <Key {...props.keyProperties[103]} />
        <Key {...props.keyProperties[104]}  />
        <Key {...props.keyProperties[105]} />
        <Key {...props.keyProperties[106]}  />
        <Key {...props.keyProperties[107]} />
        <Key {...props.keyProperties[108]} />
        <Key {...props.keyProperties[109]}/>
        <Key {...props.keyProperties[110]} />
        <Key {...props.keyProperties[111]} />
        <Key {...props.keyProperties[112]} size="1.75" />
        <Key {...props.keyProperties[113]} />
      </div>
      <div className="keyboard-ctrl-row keyboard-row">
        <Key {...props.keyProperties[125]} size="1.25" />
        <Key {...props.keyProperties[126]} size="1.25" />
        <Key {...props.keyProperties[127]} size="1.25" />
        <Key {...props.keyProperties[131]} size="6.25" />
        <Key {...props.keyProperties[131]} size="1.25" />
        <Key {...props.keyProperties[136]} size="1.25" />
        <Key {...props.keyProperties[137]} style={{'marginLeft': '2.25em'}} />
        <Key {...props.keyProperties[138]} />
        <Key {...props.keyProperties[139]} />
      </div>
    </div>
  );
};
