import { useAppSelector } from '../../hooks';
import { syncKeyboard } from '../../store/keyboardPort/actions';

export default () => {
  const selectedPort = useAppSelector(state => state.keyboardPorts.selectedPort);
  const displayLayers = useAppSelector(state => state.keyboardDisplay);
  const keyboardLeds = useAppSelector(state => state.keyboardLeds);
  const keyboardKeys = useAppSelector(state => state.keyboardKeys);

  const sync = async () => {
    await syncKeyboard(
      selectedPort,
      displayLayers,
      keyboardLeds,
      keyboardKeys
    );
  };

  return (
    <button className="rounded-sm bg-white p-0.25 px-1 hover:bg-gray-200" data-testid="sync-button" onClick={sync}>Sync</button>
  );
};
