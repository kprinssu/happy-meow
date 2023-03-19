import keyboardPortSlice from './slice';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { AppState } from '../index';

export const keyboardPortActions = keyboardPortSlice.actions;

export const fetchKeyboardPorts = (): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch) => {
    const ports: PortInfo[] = await window.keyboardAPI.listKeyboards();
    dispatch(keyboardPortActions.setPorts(ports));
  };
};
