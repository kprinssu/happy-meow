import { createLogger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import keyboardPortSlice from './keyboardPort/slice';

const middleware = [
  createLogger(),
];

const store = configureStore({
  reducer: {
    keyboardPorts: keyboardPortSlice.reducer,
  },
  middleware: middleware,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
