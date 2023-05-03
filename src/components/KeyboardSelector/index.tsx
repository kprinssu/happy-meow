import { useEffect, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchKeyboardPorts, setSelectedPort } from '../../store/keyboardPort/actions';

const KeyboardPortSelection = () => {
  const dispatch = useAppDispatch();
  const keyboardPorts = useAppSelector(state => state.keyboardPorts.allPorts);

  useEffect(() => {
    dispatch(fetchKeyboardPorts());
  }, []);

  const selectKeyboard = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const selectedIndex = parseInt(target.value);
    const selectedKeyboardPort = keyboardPorts.at(selectedIndex);
    if (selectedKeyboardPort !== undefined) {
      dispatch(setSelectedPort(selectedKeyboardPort));
    }
  };

  return (
    <div className="keybord-selector inline-block m-1">
      <label htmlFor="keyboard-port" className="mr-1">Keyboard</label>
      <select name="keyboard-port" data-testid="keyboard-port-selector" onChange={selectKeyboard}>
        <option>Select a Keyboard</option>
        { keyboardPorts.map((keyboardPort, i) => {
            return <option value={i} key={uuid()}>{keyboardPort.pnpId}</option>;
        }) }
      </select>
    </div>
  );
};

export default KeyboardPortSelection;
