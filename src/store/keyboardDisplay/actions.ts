import { KeyboardDisplayLayer } from './types';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import keyboardDisplaySlice from './slice';

export const keyboardDisplayActions = keyboardDisplaySlice.actions;

export const setLayer = (layer: KeyboardDisplayLayer): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(keyboardDisplayActions.setLayer(layer));
  };
};
