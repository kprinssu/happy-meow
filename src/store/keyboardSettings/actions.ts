import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

import { setLayer as setDisplayLayer , setLayer as setLedLayer } from '../keyboardDisplay/actions';
import { setKeyLayer } from '../keyboardKey/actions';

import { KeyboardDisplayLayer } from '../keyboardDisplay/types';
import { KeyboardKeyLayer } from '../keyboardKey/types';
import { KeyboardLedLayer } from '../keyboardLed/types';

import { PageData, KeyLayerData } from '../../keyboard/parser/schema';

export const setKeyboardProfile = (profileFilePath: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const parsedConfig = await window.keyboardAPI.loadConfig(profileFilePath);

    console.log(parsedConfig);

    // Process the loaded config into the display, key, and led states
    let displayLayerCount = 0;
    let ledLayerCount = 0;


    parsedConfig.config.page_data.forEach((pageData: PageData) => {
      // Display Layers
      if (pageData.valid && pageData.frames.frame_num > 0) {
        const displayLayer: KeyboardDisplayLayer = {
          layerIndex: displayLayerCount,
          frames: pageData.frames.frame_data,
        };

        displayLayerCount += 1;
        dispatch(setDisplayLayer(displayLayer));
      }

      // Keyboard LED Layers
      if (pageData.valid && pageData.keyframes && pageData.keyframes.frame_num > 0) {
        const displayLayer: KeyboardLedLayer = {
          layerIndex: ledLayerCount,
          frames: pageData.frames.frame_data,
        };

        ledLayerCount += 1;
        dispatch(setLedLayer(displayLayer));
      }
    });

    // Keyboard Key Layers
    if (!parsedConfig.config.key_layer.valid) {
      return;
    }

    parsedConfig.config.key_layer.layer_data.forEach((keyLayerData: KeyLayerData, index: number) => {
      console.log(keyLayerData);
      const keyLayer: KeyboardKeyLayer = {
        layerIndex: index,
        keys: keyLayerData.layer,
      };

      dispatch(setKeyLayer(keyLayer));
    });
  };
};
