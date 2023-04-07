import { KeyboardDisplayState } from './types';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const keyboardDisplayActions = keyboardDisplaySlice.actions;

export const setLayer = (layer: KeyboardDisplayState): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(keyboardDisplayActions.setLayer(layer));
  };
};
