import keyboardPortSlice from './slice';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { PortInfo } from './types';

export const keyboardPortActions = keyboardPortSlice.actions;

export const fetchKeyboardPorts = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const ports: PortInfo[] = await window.keyboardAPI.listKeyboards();
    dispatch(keyboardPortActions.setPorts(ports));
  };
};

export const setSelectedPort = (selectedPort: PortInfo): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(keyboardPortActions.setSelectedPort(selectedPort));
  };
};
