import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import Keyboard,  { setupKeyProperties, KeyProps, KeyProperties, KeyboardProps } from '../Keyboard';


export default () => {
  const keyboardKeys = useAppSelector(state => state.keyboardKeys);

  const keyLayer = keyboardKeys.layers[0];
  const keyProperties = setupKeyProperties(keyLayer);

  const keyboardProps: KeyboardProps = {
    keyProperties: keyProperties,
  };

  return (
    <div className="keyboard-led">
      <Keyboard {...keyboardProps} />
    </div>
  );
};
