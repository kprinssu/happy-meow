import { KeyboardKeyLayer } from './types';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import keyboardKeySlice from './slice';

export const keyboardKeyActions = keyboardKeySlice.actions;

export const setKeyLayer = (layer: KeyboardKeyLayer): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(keyboardKeyActions.setKeyLayer(layer));
  };
};
