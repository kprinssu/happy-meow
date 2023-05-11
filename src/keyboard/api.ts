import { PortInfo } from '@serialport/bindings-cpp';

import { Cyberboard, readJSON } from './parser';
import { listKeyboards } from './list';
import { createPort,
  openPort,
  writeToKeyboard,
  readFromKeyboard,
  closePort,
} from './io';
import { generateSetTime } from './commands/setTime';
import * as SetConfig from './commands/setConfig';

export class KeyboardApi {
  static async listKeyboards(): Promise<PortInfo[]> {
    return listKeyboards();
  }

  static async loadConfig(path: string): Promise<Cyberboard> {
    return await readJSON(path);
  }

  static async setTime(path: string): Promise<boolean> {
    const port = createPort(path);

    await openPort(port);
    const data = generateSetTime();
    await writeToKeyboard(port, data);

    await closePort(port);
    return true;
  }

  static async writeConfig(portPath: string, jsonPath: string): Promise<boolean> {
    try {
      const parsedConfig = await this.loadConfig(jsonPath);
      await this.syncKeyboard(portPath, parsedConfig);
    } catch (e) {
      console.log('Failed to write config.');
      console.log(e);
      return false;
    }

    return true;
  }

  static async syncKeyboard(portPath: string, config: Cyberboard): Promise<boolean> {
    try {
      const port = createPort(portPath);

      await openPort(port);

      const startCommand = SetConfig.generateStartCommand();
      await writeToKeyboard(port, startCommand);
      // const startData = await readFromKeyboard(port);
      await readFromKeyboard(port);

      let totalFrameSent = 0;
      const unknownInfo = SetConfig.generateUnknownInfoCommand(config);

      await writeToKeyboard(port, unknownInfo);
      totalFrameSent += 1;

      const pageControlInfos = SetConfig.generatePageControlInfoCommands(config);
      for (const pageControlCommand of pageControlInfos) {
        await writeToKeyboard(port, pageControlCommand);
        totalFrameSent += 1;
      }

      const wordInfos = SetConfig.generateWordInfoCommands(config);
      for (const wordInfoCommand of wordInfos) {
        await writeToKeyboard(port, wordInfoCommand);
        totalFrameSent += 1;
      }

      const rgbFrames = SetConfig.generateRgbFrameCommands(config);
      for (const rgbFrameCommand of rgbFrames) {
        await writeToKeyboard(port, rgbFrameCommand);
        totalFrameSent += 1;
      }

      const keyframeInfos = SetConfig.generateKeyframeCommands(config);
      for (const keyframeCommand of keyframeInfos) {
        await writeToKeyboard(port, keyframeCommand);
        totalFrameSent += 1;
      }

      const exchangeKeyInfos = SetConfig.generateExchangeKeyCommands(config);
      for (const exchangeKeyCommand of exchangeKeyInfos) {
        await writeToKeyboard(port, exchangeKeyCommand);
        totalFrameSent += 1;
      }

      const tabKeyInfos = SetConfig.generateTabKeyCommands(config);
      for (const tabKeyCommand of tabKeyInfos) {
        await writeToKeyboard(port, tabKeyCommand);
        totalFrameSent += 1;
      }

      const functionKeyInfos = SetConfig.generateFunctionKeyCommands(config);
      for (const functionKeyCommand of functionKeyInfos) {
        await writeToKeyboard(port, functionKeyCommand);
        totalFrameSent += 1;
      }

      const macroKeyInfos = SetConfig.generateMacroKeyCommands(config);
      for (const macroKeyCommand of macroKeyInfos) {
        await writeToKeyboard(port, macroKeyCommand);
        totalFrameSent += 1;
      }

      const swapKeyInfos = SetConfig.generateSwapKeyCommands(config);
      for (const swapKeyCommand of swapKeyInfos) {
        await writeToKeyboard(port, swapKeyCommand);
        totalFrameSent += 1;
      }

      const keyLayerControl = SetConfig.generateKeyLayerControlCommand(config);
      await writeToKeyboard(port, keyLayerControl);
      totalFrameSent += 1;

      const keyLayerInfos = SetConfig.generateKeyLayerCommands(config);
      for (const functionLayerCommand of keyLayerInfos) {
        await writeToKeyboard(port, functionLayerCommand);
        totalFrameSent += 1;
      }

      const stopCommand = SetConfig.generateStopCommand(totalFrameSent);
      await writeToKeyboard(port, stopCommand);
      //const endData = await readFromKeyboard(port);
      await readFromKeyboard(port);

      await closePort(port);
    } catch (e) {
      console.log('Failed to sync keyboard.');
      console.log(e);
      return false;
    }

    return true;
  }

}
