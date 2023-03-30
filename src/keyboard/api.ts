import { PortInfo } from '@serialport/bindings-cpp';

import { readJSON, Cyberboard } from './parser';
import { listKeyboards } from './list';
import { createPort, writeToKeyboard, readFromKeyboard } from './io';
import { generateSetTime } from './commands/setTime';
import * as SetConfig from './commands/setConfig';

export class KeyboardApi {
  static async listKeyboards(): Promise<PortInfo[]> {
    return listKeyboards();
  }

  static async loadConfig(path: string): Promise<ParsedConfig> {
    return await readJSON(path);
  }

  static async setTime(path: string): Promise<boolean> {
    const port = createPort(path);

    const data = generateSetTime();
    return await writeToKeyboard(port, data);
  }

  static async writeConfig(portPath: string, jsonPath: string): Promise<boolean> {
    try {
      const parsedConfig = await this.loadConfig(jsonPath);
      const config = parsedConfig.config;
      const port = createPort(portPath);

      await new Promise<void>((resolve, reject) => {
        try {
          port.open();
        } catch(e) {
          console.log(e);
          reject(e);
        }

        resolve();
      });

      const checkPageCommand = SetConfig.generateCheckPageCommand();
      await writeToKeyboard(port, checkPageCommand);

      const readData = await readFromKeyboard(port);
      console.log(readData);

      const usefulDirectivesCommand = SetConfig.generateUsefulDirectives(config.page_num, parsedConfig.processedValid);

      const startCommand = SetConfig.generateStartCommand();
      await writeToKeyboard(port, startCommand);

      const unknownInfo = SetConfig.generateUnknownInfoCommand(config);
      await writeToKeyboard(port, unknownInfo);

      const pageControlInfos = SetConfig.generatePageControlInfoCommands(config);
      for (const pageControlCommand of pageControlInfos) {
        await writeToKeyboard(port, pageControlCommand);
      }

      const wordInfos = SetConfig.generateWordInfoCommands(config);
      for (const wordInfoCommand of wordInfos) {
        await writeToKeyboard(port, wordInfoCommand);
      }

      const rgbFrames = SetConfig.generateRgbFrameCommands(config);
      for (const rgbFrameCommand of rgbFrames) {
        await writeToKeyboard(port, rgbFrameCommand);
      }

      const keyframeInfos = SetConfig.generateKeyframeCommands(config);
      for (const keyframeCommand of keyframeInfos) {
        await writeToKeyboard(port, keyframeCommand);
      }

      const exchangeKeyInfos = SetConfig.generateExchangeKeyCommands(config);
      for (const exchangeKeyCommand of exchangeKeyInfos) {
        await writeToKeyboard(port, exchangeKeyCommand);
      }

      const tabKeyInfos = SetConfig.generateTabKeyCommands(config);
      for (const tabKeyCommand of tabKeyInfos) {
        await writeToKeyboard(port, tabKeyCommand);
      }

      const functionKeyInfos = SetConfig.generateFunctionKeyCommands(config);
      for (const functionKeyCommand of functionKeyInfos) {
        await writeToKeyboard(port, functionKeyCommand);
      }

      const macroKeyInfos = SetConfig.generateMacroKeyCommands(config);
      for (const macroKeyCommand of macroKeyInfos) {
        await writeToKeyboard(port, macroKeyCommand);
      }

      const swapKeyInfos = SetConfig.generateSwapKeyCommands(config);
      for (const swapKeyCommand of swapKeyInfos) {
        await writeToKeyboard(port, swapKeyCommand);
      }

      const keyLayerControl = SetConfig.generateKeyLayerControlCommand(config);
      await writeToKeyboard(port, keyLayerControl);

      const keyLayerInfos = SetConfig.generateKeyLayerCommands(config);
      for (const functionLayerCommand of keyLayerInfos) {
        await writeToKeyboard(port, functionLayerCommand);
      }

      const stopCommand = SetConfig.generateStopCommand(config.commandCount);
      await writeToKeyboard(port, stopCommand);

      port.close();
    } catch(e) {
      console.log('errr!')
      console.error(e);
      console.log('error done????')
      return false;
    }

    return true;
  }
}
