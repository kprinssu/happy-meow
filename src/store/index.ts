import { logger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import keyboardPortSlice from './keyboardPort/slice';
import keyboardDisplaySlice from './keyboardDisplay/slice';
import keyboardLedSlice from './keyboardLed/slice';
import keyboardKeySlice from './keyboardKey/slice';

import { saveState, loadState } from './storage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    keyboardPorts: keyboardPortSlice.reducer,
    keyboardDisplay: keyboardDisplaySlice.reducer,
    keyboardLeds: keyboardLedSlice.reducer,
    keyboardKeys: keyboardKeySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat(logger);
    }

    if (process.env.NODE_ENV === 'test') {
      // Disable warnings on size of state in tests
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    }

    return getDefaultMiddleware();
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    keyboardPorts: store.getState().keyboardPorts,
    keyboardDisplay: store.getState().keyboardDisplay,
    keyboardLeds: store.getState().keyboardLeds,
    keyboardKeys: store.getState().keyboardKeys,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
