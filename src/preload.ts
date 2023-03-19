import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('keyboardAPI', {
  listKeyboard: () => ipcRenderer.invoke('keyboard:list'),
});
