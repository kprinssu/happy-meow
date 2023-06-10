const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
    console.error(err);
  }
};

const loadState = (): any | null => {
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
