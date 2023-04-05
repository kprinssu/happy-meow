import { useState, useEffect, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchKeyboardPorts, setSelectedPort } from '../../store/keyboardPort/actions';

const KeyboardPortSelection = () => {
  const [keyboardPort, setKeyboardPort] = useState(1);
  const dispatch = useAppDispatch();
  const keyboardPorts = useAppSelector(state => state.keyboardPorts.allPorts);
  const selectedPort = useAppSelector(state => state.keyboardPorts.selectedPort);

  useEffect(() => {
    dispatch(fetchKeyboardPorts());
  }, []);

  const selectKeyboard = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const selectedIndex = parseInt(target.value);
    const selectedKeyboardPort = keyboardPorts.at(selectedIndex);
    if (selectedKeyboardPort !== undefined) {
      window.keyboardAPI.setTime(selectedKeyboardPort.path);
      setKeyboardPort(selectedIndex);
      dispatch(setSelectedPort(selectedKeyboardPort));
    }
  };

  return (
    <div>
      <label htmlFor="keyboardPort">Choose a Keyboard</label>
      <select name="keyboardPort" onChange={selectKeyboard}>
        <option>Select a Keyboard</option>
        { keyboardPorts.map((keyboardPort, i) => {
            return <option value={i} key={uuid()}>{keyboardPort.pnpId}</option>
        }) }
      </select>
    </div>
  );
};

export default KeyboardPortSelection;
