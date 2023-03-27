import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('keyboardAPI', {
  listKeyboards: () => ipcRenderer.invoke('keyboard:list'),
  setTime: (portPath: string) => ipcRenderer.invoke('keyboard:setTime', portPath),
  writeConfig: (portPath: string, jsonPath: string) => ipcRenderer.invoke('keyboard:writeConfig', portPath, jsonPath),
  loadConfig: (path: string) => ipcRenderer.invoke('keyboard:loadConfig', path),
});
