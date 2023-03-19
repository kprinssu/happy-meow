import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('keyboardAPI', {
  listKeyboards: () => ipcRenderer.invoke('keyboard:list'),
});
