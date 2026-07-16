type StoreState = {
  keyboardPorts: Record<string, unknown>;
  keyboardDisplay: Record<string, unknown>;
  keyboardLeds: Record<string, unknown>;
  keyboardKeys: Record<string, unknown>;
};

const saveState = (state: StoreState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
    console.error(err);
  }
};

const loadState = (): StoreState | null => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState != null) {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error(err);
  }

  return null;
};

export {
  saveState,
  loadState
};
