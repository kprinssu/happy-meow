import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setKeyLayer } from '../../store/keyboardKey/actions';

import { KeyProps } from '../Keyboard/Key';
import Keyboard, { setupKeyProperties, KeyboardProps } from '../Keyboard';

export default () => {
  const dispatch = useAppDispatch();
  const keyboardKeys = useAppSelector(state => state.keyboardKeys);

  const [currentLayer, setCurrentLayer] = useState(0);

  const keyLayer = keyboardKeys.layers[currentLayer];
  const keyProperties = setupKeyProperties(keyLayer.keys);

  const keyboardProps: KeyboardProps = {
    keyProperties: keyProperties,
  };
  const changeLayer = (layer: number) => {
    setCurrentLayer(layer);
  };

  return (
    <div className="keyboard-keys">
      <ul className='inline-block'>
        <li onClick={() => changeLayer(0)} data-testid="display-layer-frame-1" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 1</li>
        <li onClick={() => changeLayer(1)} data-testid="display-layer-frame-2" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 2</li>
      </ul>

      <Keyboard {...keyboardProps} />
    </div>
  );
};
