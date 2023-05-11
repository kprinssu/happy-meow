import { KeyboardPortState, PortInfo } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { syncKeyboard } from './actions';
import { ParsedConfig } from '../../keyboard/parser/ParsedConfig';

const initialState: KeyboardPortState = {
  selectedPort: null,
  allPorts: [],
};

export default createSlice({
  name: 'keyboardPort',
  initialState: initialState,
  reducers: {
    setSelectedPort(state: KeyboardPortState, action: PayloadAction<PortInfo>) {
      state.selectedPort = action.payload;
    },
    setPorts(state: KeyboardPortState, action: PayloadAction<PortInfo[]>) {
      state.allPorts = action.payload;
    },
  },
});

