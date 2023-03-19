import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchKeyboardPorts } from '../../store/keyboardPort/actions';

const KeyboardPortSelection = () => {
  const [keyboardPort, setKeyboardPort] = useState(1);
  const dispatch = useAppDispatch();
  const keyboardPorts = useAppSelector(state => state.keyboardPorts.allPorts);
  const selectedPort = useAppSelector(state => state.keyboardPorts.selectedPort);

  useEffect(() => {
    dispatch(fetchKeyboardPorts());
  }, []);

  return (<div></div>);
};

export default KeyboardPortSelection;
