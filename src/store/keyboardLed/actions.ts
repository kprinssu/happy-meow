import { KeyboardLedLayer } from './types';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import keyboardLedSlice from './slice';

export const keyboardLedActions = keyboardLedSlice.actions;

export const setLayer = (layer: KeyboardLedLayer): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(keyboardLedActions.setLayer(layer));
  };
};
