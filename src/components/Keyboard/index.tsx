import React from 'react';

import './Keyboard.css';
import Key from './Key';

export default () => {

  return (
    <div className="keyboard mt-2">
      <div className="keyboard-fn-row keyboard-row">
        <Key label="Esc" />
        <Key label="F1" style={{'margin-left': '0.5em'}} />
        <Key label="F2" />
        <Key label="F3" />
        <Key label="F4" />
        <Key label="F5"  style={{'margin-left': '0.5em'}} />
        <Key label="F6" />
        <Key label="F7" />
        <Key label="F8" />
        <Key label="F9"  style={{'margin-left': '0.5em'}}  />
        <Key label="F10" />
        <Key label="F11" />
        <Key label="F12" />
        <Key label="PrtSc"  style={{'margin-left': '0.5em'}}  />
        <Key label="Scroll Lock" />
      </div>
      <div className="keyboard-num-row keyboard-row">
        <Key label="~" />
        <Key label="1" />
        <Key label="2" />
        <Key label="3" />
        <Key label="4" />
        <Key label="5" />
        <Key label="6" />
        <Key label="7" />
        <Key label="8" />
        <Key label="9" />
        <Key label="0" />
        <Key label="-" />
        <Key label="=" />
        <Key label="Backspace" size="2" />
        <Key label="End" />
      </div>
      <div className="keyboard-qwerty-row keyboard-row">
        <Key label="Tab" size="1.5" />
        <Key label="Q" />
        <Key label="W" />
        <Key label="E" />
        <Key label="R" />
        <Key label="T" />
        <Key label="Y" />
        <Key label="U" />
        <Key label="I" />
        <Key label="O" />
        <Key label="P" />
        <Key label="[" />
        <Key label="]" />
        <Key label="\" size="1.5" />
        <Key label="PgUp" />
      </div>
      <div className="keyboard-caps-row keyboard-row">
        <Key label="Caps Lock" size="1.75" />
        <Key label="A" />
        <Key label="S" />
        <Key label="D" />
        <Key label="F" />
        <Key label="G" />
        <Key label="H" />
        <Key label="J" />
        <Key label="K" />
        <Key label="L" />
        <Key label=";" />
        <Key label="'" />
        <Key label="Enter" size="2.5" />
        <Key label="PgDn" />
      </div>
      <div className="keyboard-shift-row keyboard-row">
        <Key label="L Shift" size="2.5" />
        <Key label="Z" />
        <Key label="X" />
        <Key label="C" />
        <Key label="V" />
        <Key label="B" />
        <Key label="N" />
        <Key label="M" />
        <Key label="," />
        <Key label="." />
        <Key label="/" />
        <Key label="R Shift" size="1.75" />
        <Key label="Up" />
      </div>
      <div className="keyboard-ctrl-row keyboard-row">
        <Key label="L Ctrl" size="1.25" />
        <Key label="L Win" size="1.25" />
        <Key label="L Alt" size="1.25" />
        <Key label="Space" size="6.25" />
        <Key label="Fn" size="1.25" />
        <Key label="R Ctrl" size="1.25" />
        <Key label="Left" style={{'margin-left': '1em'}} />
        <Key label="Down" />
        <Key label="Right" />
      </div>
    </div>
  );
};
