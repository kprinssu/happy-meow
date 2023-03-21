import { logger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import keyboardPortSlice from './keyboardPort/slice';

const customMiddleWare = (getDefaultMiddleware) => {
  const defaultMiddlware = getDefaultMiddleware();
  return defaultMiddlware.concat([logger]);
};

const store = configureStore({
  reducer: {
    keyboardPorts: keyboardPortSlice.reducer,
  },
  middleware: customMiddleWare,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
