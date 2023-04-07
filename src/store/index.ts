import { logger } from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import keyboardPortSlice from './keyboardPort/slice';
import keyboardDisplaySlice from './keyboardDisplay/slice';

const store = configureStore({
  reducer: {
    keyboardPorts: keyboardPortSlice.reducer,
    keyboardDisplay: keyboardDisplaySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
