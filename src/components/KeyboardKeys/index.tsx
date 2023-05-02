import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setKeyboardKeys } from '../../store/keyboardKey/slice';
import Keyboard, { setupKeyProperties, KeyProps, KeyProperties, KeyboardProps } from '../Keyboard';

export default () => {
  const dispatch = useAppDispatch();
  const keyboardKeys = useAppSelector(state => state.keyboardKeys);

  const keyLayer = keyboardKeys.layers[0];
  const keyProperties = setupKeyProperties(keyLayer);

  console.log(keyLayer);

  const keyboardProps: KeyboardProps = {
    keyProperties: keyProperties,
  };

  return (
    <div className="keyboard-keys">
      <Keyboard {...keyboardProps} />
    </div>
  );
};
