import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

export default () => {
  const [keyboardPort, _setKeyboardPort] = useState(1);
  const dispatch = useAppDispatch();
  const selectedPort = useAppSelector(state => state.keyboardPorts.selectedPort);

  const sync = async () => {
    await window.keyboardAPI.setTime(selectedPort.path);
  };

  return (
    <button className="rounded-sm bg-white p-0.25 px-1 hover:bg-gray-200" onClick={sync}>Sync</button>
  );
};
