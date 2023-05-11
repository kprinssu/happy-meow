import keyboardPortSlice from './slice';
import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { PortInfo } from './types';

import { KeyboardDisplayState } from '../keyboardDisplay/types';
import { KeyboardKeyState } from '../keyboardKey/types';
import { KeyboardLedState } from '../keyboardLed/types';

import { CyberboardConfig, PageData, KeyLayerData, KeyLayer } from '../../keyboard/parser/schema';


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

export const syncKeyboard = async (selectedPort: PortInfo | null, displayLayers: KeyboardDisplayState, keyboardLedLayers: KeyboardLedState, keyboardKeyLayers: KeyboardKeyState) => {
  if (selectedPort === null) {
    return;
  }

  // Set the time
  await window.keyboardAPI.setTime(selectedPort.path);

  // Transform state to match the API

  // Battery page
  // This will show the battery indicator on the display
  const batteryPage: PageData = {
    valid: true,
    page_index: 0,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ]
    },
    frames: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    },
    keyframes: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    }
  };

  // Mosaic page
  // This will show the multi-coloured sparkling mosaic on the display
  const mosaicPage: PageData = {
    valid: true,
    page_index: 1,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ]
    },
    frames: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    },
    keyframes: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    }
  };

  // Time page
  // This will show the time on the display
  const timePage: PageData = {
    valid: true,
    page_index: 2,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#ffffff'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ]
    },
    frames: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    },
    keyframes: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    }
  };

  // Text page
  // No idea what this does on the keyboard
  const textPage: PageData = {
    valid: false,
    page_index: 3,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: true,
      back_rgb: '#000500',
      rgb: '#F91D00'
    },
    word_page: {
      valid: true,
      word_len: 28,
      unicode: [
        '#0041',
        '#0042',
        '#0043',
        '#0044',
        '#0045',
        '#0046',
        '#0047',
        '#0048',
        '#0049',
        '#004A',
        '#004B',
        '#004C',
        '#004D',
        '#004E',
        '#004F',
        '#0050',
        '#0051',
        '#0052',
        '#0053',
        '#0054',
        '#0055',
        '#0056',
        '#0057',
        '#0058',
        '#0059',
        '#005A',
        '#005B',
        '#005C'
      ]
    },
    frames: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    },
    keyframes: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    }
  };

  // Streamer page
  // No idea what this does on the keyboard
  const streamerPage: PageData = {
    valid: false,
    page_index: 4,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ]
    },
    frames: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#0000'
          ]
        }
      ]
    },
    keyframes: {
      valid: false,
      frame_num: 0,
      frame_data: [
        {
          frame_index: 0,
          'frame_RGB': [
            '#000000'
          ]
        }
      ]
    }
  };

  // Custom pages (our display and keyboard LED layers)
  // These pages correspond to layer 1, 2, 3 as combined layers on the keyboard
  const customLayer1: PageData = {
    valid: true,
    page_index: 5,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ],
    },
    frames: {
      valid: true,
      frame_num: displayLayers.layers[0].frames.length,
      frame_data: displayLayers.layers[0].frames,
    },
    keyframes: {
      valid: true,
      frame_num: keyboardLedLayers.layers[0].frames.length,
      frame_data: keyboardLedLayers.layers[0].frames,
    },
  };

  const customLayer2: PageData = {
    valid: true,
    page_index: 6,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ],
    },
    frames: {
      valid: true,
      frame_num: displayLayers.layers[1].frames.length,
      frame_data: displayLayers.layers[1].frames,
    },
    keyframes: {
      valid: true,
      frame_num: keyboardLedLayers.layers[1].frames.length,
      frame_data: keyboardLedLayers.layers[1].frames,
    },
  };

  const customLayer3: PageData = {
    valid: true,
    page_index: 7,
    lightness: 100,
    speed_ms: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000'
    },
    word_page: {
      valid: false,
      word_len: 0,
      unicode: [
        '#0000'
      ],
    },
    frames: {
      valid: true,
      frame_num: displayLayers.layers[2].frames.length,
      frame_data: displayLayers.layers[2].frames,
    },
    keyframes: {
      valid: true,
      frame_num: keyboardLedLayers.layers[2].frames.length,
      frame_data: keyboardLedLayers.layers[2].frames,
    },
  };

  const pages: PageData[] = [
    batteryPage,
    mosaicPage,
    timePage,
    textPage,
    streamerPage,
    customLayer1,
    customLayer2,
    customLayer3
  ];

  const keyLayerData: KeyLayerData[] = [];
  for (let i = 0; i < keyboardKeyLayers.layers.length; i++) {
    const layer = keyboardKeyLayers.layers[i];
    const keyLayerDataItem: KeyLayerData = {
      layer: layer.keys,
    };
    keyLayerData.push(keyLayerDataItem);
  }

  const keyLayer: KeyLayer = {
    valid: true,
    layer_num: keyLayerData.length,
    layer_data: keyLayerData,
  };
  const rawConfig: CyberboardConfig = {
    product_info: {
      product_info_addr: 'product_info_addr',
      product_id: 'CB_XX',
    },
    page_num: pages.length,
    page_data: pages,
    exchange_num: 0,
    exchange_key: [],
    tab_key_num: 2,
    tab_key: [
      {
        ta_key_index: 0,
        key_value: '#0007000B',
        single_key_out: [
          '#0007000B'
        ],
        double_key_out: [
          '#0007000C'
        ],
        three_key_out: [
          '#0007000D'
        ],
        long_key_out: [
          '#0007000E'
        ]
      },
      {
        ta_key_index: 1,
        key_value: '#0007000F',
        single_key_out: [
          '#0007000F'
        ],
        double_key_out: [
          '#00070010'
        ],
        three_key_out: [
          '#0007011'
        ],
        long_key_out: [
          '#00070012'
        ]
      }
    ],
    Fn_key_num: 5,
    Fn_key: [
      {
        Fn_key_index: 0,
        input_key: '#00070013',
        out_key: '#00070014'
      },
      {
        Fn_key_index: 1,
        input_key: '#00070014',
        out_key: '#00070015'
      },
      {
        Fn_key_index: 2,
        input_key: '#00070015',
        out_key: '#00070016'
      },
      {
        Fn_key_index: 3,
        input_key: '#00070016',
        out_key: '#00070017'
      },
      {
        Fn_key_index: 4,
        input_key: '#00070017',
        out_key: '#00070018'
      }
    ],
    MACRO_key_num: 3,
    MACRO_key: [
      {
        MACRO_key_index: 0,
        input_key: '#00070013',
        out_key: [
          '#00070013',
          '#00070014',
          '#00070015',
          '#00070016',
          '#00070017'
        ],
        intvel_ms: [
          0,
          100,
          100,
          100,
          100
        ]
      },
      {
        MACRO_key_index: 1,
        input_key: '#00070014',
        out_key: [
          '#00070013'
        ],
        intvel_ms: [
          0
        ]
      },
      {
        MACRO_key_index: 2,
        input_key: '#00070015',
        out_key: [
          '#00070013',
          '#00070014'
        ],
        intvel_ms: [
          0
        ]
      }
    ],
    swap_key_num: 4,
    swap_key: [
      {
        swap_key_index: 0,
        input_key: '#00070004',
        out_key: '#00070005'
      },
      {
        swap_key_index: 1,
        input_key: '#00070005',
        out_key: '#00070004'
      },
      {
        swap_key_index: 2,
        input_key: '#00070007',
        out_key: '#00070008'
      },
      {
        swap_key_index: 3,
        input_key: '#00070008',
        out_key: '#00070009'
      }
    ],
    key_layer: keyLayer,
  };

  await window.keyboardAPI.syncKeyboard(selectedPort.path, rawConfig);
};
