import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('keyboardAPI', {
  listKeyboards: () => ipcRenderer.invoke('keyboard:list'),
  setTime: (path: string) => ipcRenderer.invoke('keyboard:setTime', path),
});
