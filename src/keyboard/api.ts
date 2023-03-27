import { PortInfo } from '@serialport/bindings-cpp';

import { readJSON, Cyberboard } from './parser';
import { listKeyboards } from './list';
import { createPort, writeToKeyboard } from './io';
import { generateSetTime } from './commands/setTime';
import * as SetConfig from './commands/setConfig';

export class KeyboardApi {
  static async listKeyboards(): Promise<PortInfo[]> {
    return listKeyboards();
  }

  static async loadConfig(path: string): Promise<Cyberboard> {
    const jsonData = await readJSON(path);
    return new Cyberboard(jsonData);
  }

  static async setTime(path: string): Promise<boolean> {
    const port = createPort(path);

    const data = generateSetTime();
    return await writeToKeyboard(port, data);
  }

  static async writeConfig(portPath: string, jsonPath: string): Promise<boolean> {
    try {
      const config = await this.loadConfig(jsonPath);
      const port = createPort(portPath);

      const startCommand = SetConfig.generateStartCommand();
      await writeToKeyboard(port, startCommand);

      const unknownInfo = SetConfig.generateUnknownInfoCommand(config);
      await writeToKeyboard(port, unknownInfo);

      const pageControlInfos = SetConfig.generatePageControlInfoCommands(config);
      for (let pageControlCommand of pageControlInfos) {
        await writeToKeyboard(port, pageControlCommand);
      }

      const wordInfos = SetConfig.generateWordInfoCommands(config);
      for (let wordInfoCommand of wordInfos) {
        await writeToKeyboard(port, wordInfoCommand);
      }

      const rgbFrames = SetConfig.generateRgbFrameCommands(config);
      for (let rgbFrameCommand of rgbFrames) {
        await writeToKeyboard(port, rgbFrameCommand);
      }

      const keyframeInfos = SetConfig.generateKeyframeCommands(config);
      for (let keyframeCommand of keyframeInfos) {
        await writeToKeyboard(port, keyframeCommand);
      }

      const exchangeKeyInfos = SetConfig.generateExchangeKeyCommands(config);
      for (let exchangeKeyCommand of exchangeKeyInfos) {
        await writeToKeyboard(port, exchangeKeyCommand);
      }

      const tabKeyInfos = SetConfig.generateTabKeyCommands(config);
      for (let tabKeyCommand of tabKeyInfos) {
        await writeToKeyboard(port, tabKeyCommand);
      }

      const functionKeyInfos = SetConfig.generateFunctionKeyCommands(config);
      for (let functionKeyCommand of functionKeyInfos) {
        await writeToKeyboard(port, functionKeyCommand);
      }

      const macroKeyInfos = SetConfig.generateMacroKeyCommands(config);
      for (let macroKeyCommand of macroKeyInfos) {
        await writeToKeyboard(port, macroKeyCommand);
      }

      const swapKeyInfos = SetConfig.generateSwapKeyCommands(config);
      for (let swapKeyCommand of swapKeyInfos) {
        await writeToKeyboard(port, swapKeyCommand);
      }

      const keyLayerControl = SetConfig.generateKeyLayerControlCommand(config);
      await writeToKeyboard(port, keyLayerControl);

      const keyLayerInfos = SetConfig.generateKeyLayerCommands(config);
      for (let functionLayerCommand of keyLayerInfos) {
        await writeToKeyboard(port, functionLayerCommand);
      }

      const stopCommand = SetConfig.generateStopCommand(config.commandCount);
      await writeToKeyboard(port, stopCommand);

      console.log('write keyboard finished')
    } catch(e) {
      console.log(e);
      return false;
    }

    return true;
  }
}
