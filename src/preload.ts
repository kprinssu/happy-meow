import { contextBridge, ipcRenderer } from 'electron';
import { CyberboardConfig } from './keyboard/parser/schema';

contextBridge.exposeInMainWorld('keyboardAPI', {
  listKeyboards: () => ipcRenderer.invoke('keyboard:list'),
  setTime: (portPath: string) => ipcRenderer.invoke('keyboard:setTime', portPath),
  syncKeyboard: (portPath: string, config: CyberboardConfig) => ipcRenderer.invoke('keyboard:syncKeyboard', portPath, config),
  writeConfig: (portPath: string, jsonPath: string) => ipcRenderer.invoke('keyboard:writeConfig', portPath, jsonPath),
  loadConfig: (path: string) => ipcRenderer.invoke('keyboard:loadConfig', path),
});
