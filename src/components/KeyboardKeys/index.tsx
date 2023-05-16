import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { KeyboardKeyLayer } from '../../store/keyboardKey/types';
import { setKeyLayer } from '../../store/keyboardKey/actions';

import Keyboard, { setupKeyProperties, KeyboardProps } from '../Keyboard';
import { KEYBOARD_KEYS } from '../../utils/keyboardKeys';

export default () => {
  const dispatch = useAppDispatch();
  const keyboardKeys = useAppSelector(state => state.keyboardKeys);

  const [currentLayer, setCurrentLayer] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<string>('#000000');

  const handleKeyClick = (index: number) => {
    const newKeys = [...keyboardKeys.layers[currentLayer].keys];
    newKeys[index] = selectedKey;

    const newKeyLayer: KeyboardKeyLayer = {
      layerIndex: currentLayer,
      keys: newKeys,
    };

    dispatch(setKeyLayer(newKeyLayer));
  };

  const keyLayer = keyboardKeys.layers[currentLayer];
  const keyProperties = setupKeyProperties(keyLayer.keys, handleKeyClick);

  const keyboardProps: KeyboardProps = {
    keyProperties: keyProperties,
  };

  const changeLayer = (layer: number) => {
    setCurrentLayer(layer);
  };

  const changeSelectedKey = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(event.target.value);
  };

  return (
    <div className="keyboard-keys ml-1 mt-2 text-sm">
      <ul className='inline-block'>
        <li onClick={() => changeLayer(0)} data-testid="display-layer-frame-1" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 1</li>
        <li onClick={() => changeLayer(1)} data-testid="display-layer-frame-2" className="inline-block mr-1 bg-white rounded-full p-1 cursor-pointer hover:bg-slate-300">Layer 2</li>
      </ul>

      <div className="keyboard-key-infobar text-base mt-2">
        <span data-testid="display-layer">Layer {currentLayer + 1}</span>
      </div>

      <Keyboard {...keyboardProps} />

      <div className="keyboard-key-selector">
        <label htmlFor="key-selector">Key:</label>
        <select id="key-selector" name="key-selector" onChange={changeSelectedKey} data-testid='key-selector'>
          <option value="#000000">None</option>
          {
            Object.entries(KEYBOARD_KEYS).map((entry: [string, string], index: number) => {
              return (
                <option key={index} value={entry[1]}>{entry[0]}</option>
              );
            })
          }
        </select>

      </div>
    </div>
  );
};
