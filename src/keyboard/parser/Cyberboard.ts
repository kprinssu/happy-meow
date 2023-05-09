import { Buffer } from 'buffer';

import * as Schema from './schema';

export interface UnknownInfoCommand {
  pageIndex: number;
  wordNum: number;
  frameNum: number;
  keyframeNum: number;
}

export interface PageControlInfo {
  valid: boolean;
  pageIndex: number;
  brightness: number;
  speed: number;
  color: Schema.Color;
}

export interface PageControlInfoCommand {
  usbFrameCount: number;
  usbFrameIndex: number;
  pageNum: number;
  controlInfos: PageControlInfo[];
}

export interface WordPageInfoCommand {
  frameIndex: number;
  pageIndex: number;
  valid: boolean;
  wordLen: number;
  unicode: string[];
}

export interface RgbFrameInfoCommand {
  pageIndex: number;
  frameIndex: number;
  usbFrameIndex: number;
  frameRgb: Buffer;
}

export interface KeyframeInfoCommand {
  pageIndex: number;
  frameIndex: number;
  usbFrameIndex: number;
  frameRgb: Buffer;
}

export type ExchangeKeyInfoCommand = Schema.ExchangeKey

export type TabKeyInfoCommand = Schema.TabKey

export interface FunctionKeyInfoCommand {
  functionKeyCount: number;
  keyNumber: number;
  functionKeys: Schema.FunctionKey[];
}

export type MacroKeyInfoCommand = Schema.MacroKey

export interface SwapKeyInfoCommand {
  swapKeyCount: number;
  keyNumber: number;
  swapKeys: Schema.SwapKey[];
}

export interface KeyLayerInfoCommand {
  usbFrameIndex: number;
  layerBytes: Buffer;
}

export class Cyberboard {
  config: Schema.CyberboardConfig;
  commandCount: number;
  unknownInfos: UnknownInfoCommand[];
  pageControlInfos: PageControlInfoCommand[];
  wordPageInfos: WordPageInfoCommand[];
  rgbFrameInfos: RgbFrameInfoCommand[];
  keyframeInfos: KeyframeInfoCommand[];
  exchangeKeyInfos: ExchangeKeyInfoCommand[];
  tabKeyInfos: TabKeyInfoCommand[];
  functionKeyInfos: FunctionKeyInfoCommand[];
  macroKeyInfos: MacroKeyInfoCommand[];
  swapKeyInfos: SwapKeyInfoCommand[];
  keyLayerInfos: KeyLayerInfoCommand[];

  constructor(config: Schema.CyberboardConfig) {
    this.config = config;
    this.commandCount = 0;
    this.unknownInfos = [];
    this.pageControlInfos = [];
    this.wordPageInfos = [];
    this.rgbFrameInfos = [];
    this.keyframeInfos = [];
    this.exchangeKeyInfos = [];
    this.tabKeyInfos = [];
    this.functionKeyInfos = [];
    this.macroKeyInfos = [];
    this.swapKeyInfos = [];
    this.keyLayerInfos = [];

    this.preprocessCommands();
  }

  preprocessCommands() {
    this.processUnknownCommands();
    this.processPageControl();
    this.processWordPage();
    this.processRgbFrames();
    this.processKeyFrames();
    this.processExchangeKeys();
    this.processTabKeys();
    this.processFunctionKeys();
    this.processMacroKeys();
    this.processSwapKeys();
    this.processKeyLayer();
  }

  processUnknownCommands() {
    // Process the Page Data for Unknown Commands
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      let keyframeNum = 0;

      if (pageData.keyframes !== undefined) {
        keyframeNum = pageData.keyframes.frame_num;
      }

      const unknownCommand: UnknownInfoCommand = {
        pageIndex: pageData.page_index,
        wordNum: pageData.word_page.word_len,
        frameNum: pageData.frames.frame_num,
        keyframeNum: keyframeNum,
      };

      this.unknownInfos.push(unknownCommand);
    }

    this.commandCount += 1;
  }

  processPageControl() {
    // Process the Page Control Commands
    const pageControlCount = Math.ceil(this.config.page_num / 4);

    // Create the PageControl
    const createPageControlCommands = (pageControlInfoItems: PageControlInfo[], pageDataSet: Schema.PageData[]) => {

      for (let j = 0; j < pageDataSet.length; j++) {
        const pageData: Schema.PageData = pageDataSet[j];
        const pageControlInfo: PageControlInfo = {
          valid: pageData.valid,
          pageIndex: pageData.page_index,
          brightness: pageData.lightness,
          speed: pageData.speed_ms,
          color: pageData.color,
        };

        pageControlInfoItems.push(pageControlInfo);
      }
    };

    for (let i = 0; i < pageControlCount; i++) {
      const pageControlInfoItems: PageControlInfo[] = [];
      let pageNum = 0;

      if (4 * (i + 1) > this.config.page_num) {
        pageNum = this.config.page_num % 4;
        const pageDataSet = this.config.page_data.slice(4 * i, this.config.page_num);

        createPageControlCommands(pageControlInfoItems, pageDataSet);
      } else {
        pageNum = 4;
        const pageDataSet = this.config.page_data.slice(4 * i, 4 * i + 4);

        createPageControlCommands(pageControlInfoItems, pageDataSet);
      }

      this.commandCount += 1;
      const pageControlInfoCommand: PageControlInfoCommand = {
        usbFrameCount: pageControlCount,
        usbFrameIndex: i,
        pageNum: pageNum,
        controlInfos: pageControlInfoItems,
      };

      this.pageControlInfos.push(pageControlInfoCommand);
    }
  }

  processWordPage()  {
    // Process the Word Page
    let wordPageCount = 0;
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      const wordPage = pageData.word_page;

      if (wordPage.word_len === 0) {
        continue;
      }

      wordPageCount = Math.ceil(wordPage.word_len / 28);

      for (let j = 0; j < wordPageCount; j++) {
        const pageIndex = pageData.page_index;
        const valid = wordPage.valid;
        let wordLen = 0;
        let selectedUnicode: string[] = [];

        if (28 * (j + 1) > wordPage.word_len) {
          wordLen = wordPage.word_len % 28;
          selectedUnicode = wordPage.unicode.slice(28 * j, wordPage.word_len);
        } else {
          wordLen = 28;
          selectedUnicode = wordPage.unicode.slice(28 * j, 28 * (j + 1));
        }

        const wordPageInfo: WordPageInfoCommand = {
          frameIndex: j,
          pageIndex: pageIndex,
          valid: valid,
          wordLen: wordLen,
          unicode: selectedUnicode,
        };

        this.commandCount += 1;
        this.wordPageInfos.push(wordPageInfo);
      }
    }
  }

  processRgbFrames() {
    // Process the RGB Frames
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      const frames = pageData.frames;

      if (frames.frame_num === 0) {
        continue;
      }

      for (let j = 0; j < frames.frame_data.length; j++) {
        const frameData = frames.frame_data[j];
        const frameRgb = Buffer.alloc(600);
        let lastWritten = 0;

        for (let k = 0; k < frameData.frame_RGB.length; k++) {
          const rgb = frameData.frame_RGB[k];
          // Strip the # out of the colour code and convert to a buffer
          const newFrameRgb = Buffer.from(rgb.substring(1), 'hex');

          newFrameRgb.copy(frameRgb, lastWritten);
          lastWritten += newFrameRgb.length;
        }

        // 600 bytes of data can fit in 11 * 64 byte size frames
        for (let k = 0; k < 11; k++) {
          const rgbFrameInfo: RgbFrameInfoCommand = {
            pageIndex: pageData.page_index,
            frameIndex: frameData.frame_index,
            usbFrameIndex: k,
            frameRgb: frameRgb.subarray(560, 600),
          };

          if (k < 10) {
            rgbFrameInfo.frameRgb = frameRgb.subarray(k * 56, (k + 1) * 56);
          }

          this.commandCount += 1;
          this.rgbFrameInfos.push(rgbFrameInfo);
        }
      }
    }
  }

  processKeyFrames() {
    // Process the Keyframes
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      const keyframes = pageData.keyframes;

      // Keyframes are optional and can be null
      if (keyframes === undefined || keyframes.frame_num === 0) {
        continue;
      }

      for (let j = 0; j < keyframes.frame_data.length; j++) {
        const frameData = keyframes.frame_data[j];
        const frameRgb = Buffer.alloc(270);
        let lastWritten = 0;

        for (let k = 0; k < frameData.frame_RGB.length; k++) {
          const rgb = frameData.frame_RGB[k];
          // Strip the # out of the colour code and convert to a buffer
          const newFrameRgb = Buffer.from(rgb.substring(1), 'hex');

          newFrameRgb.copy(frameRgb, lastWritten);
          lastWritten += newFrameRgb.length;
        }

        for (let k = 0; k < 5; k++) {
          // USB Frame Index is constant at 4 (no idea why)
          const keyframeInfo: KeyframeInfoCommand = {
            pageIndex: pageData.page_index,
            frameIndex: frameData.frame_index,
            usbFrameIndex: k,
            frameRgb: frameRgb.subarray(224, 270),
          };

          if (k < 4) {
            keyframeInfo.frameRgb = frameRgb.subarray(k * 56, (k + 1) * 56);
          }

          this.keyframeInfos.push(keyframeInfo);
          this.commandCount += 1;
        }
      }
    }
  }

  processExchangeKeys() {
    // Process the Exchange Keys
    for (let i = 0; i < this.config.exchange_key.length; i++) {
      const exchangeKey = this.config.exchange_key[i] as ExchangeKeyInfoCommand;
      this.exchangeKeyInfos.push(exchangeKey);
      this.commandCount += 1;
    }
  }

  processTabKeys() {
    // Process the Tab Keys
    for (let i = 0; i < this.config.tab_key.length; i++) {
      const tabKey = this.config.tab_key[i] as TabKeyInfoCommand;
      this.tabKeyInfos.push(tabKey);
      this.commandCount += 1;
    }
  }

  processFunctionKeys() {
    // Process the Function Keys
    const functionKeyCount = Math.ceil(this.config.Fn_key_num / 11);
    for (let i = 0; i < functionKeyCount; i++) {
      const functionKeyInfo: FunctionKeyInfoCommand = {
        functionKeyCount: this.config.Fn_key_num,
        keyNumber: this.config.Fn_key_num % 11,
        functionKeys: [],
      };

      if ((i + 1) == functionKeyCount) {
        functionKeyInfo.functionKeys = this.config.Fn_key.slice(i * 11, this.config.Fn_key.length);
      } else {
        functionKeyInfo.keyNumber = 11;
        functionKeyInfo.functionKeys = this.config.Fn_key.slice(11 * i, 11 * (i + 1));
      }

      this.functionKeyInfos.push(functionKeyInfo);
      this.commandCount += 1;
    }
  }

  processMacroKeys() {
    // Process the Macro Keys
    for (let i = 0; i < this.config.MACRO_key.length; i++) {
      const macroKeyInfo = this.config.MACRO_key[i] as MacroKeyInfoCommand;
      this.macroKeyInfos.push(macroKeyInfo);
      this.commandCount += 1;
    }
  }

  processSwapKeys() {
    // Process the Swap Keys
    const swapKeyCount = Math.ceil(this.config.swap_key_num/ 11);
    for (let i = 0; i < swapKeyCount; i++) {
      const swapKeyInfo: SwapKeyInfoCommand = {
        swapKeyCount: this.config.swap_key_num,
        keyNumber: this.config.swap_key_num % 11,
        swapKeys: [],
      };

      if ((i + 1) == swapKeyCount) {
        swapKeyInfo.swapKeys = this.config.swap_key.slice(11 * i, this.config.swap_key.length);
      } else {
        swapKeyInfo.swapKeys = this.config.swap_key.slice(11 * i, 11 * (i + 1));
      }

      this.swapKeyInfos.push(swapKeyInfo);
      this.commandCount += 1;
    }
  }

  processKeyLayer() {
    if (!this.config.key_layer.valid) {
      return;
    }

    // TODO: Ensure that 16000 is enough
    // AM has this at max 1600 bytes
    const layerBytes = Buffer.alloc(1600);
    let lastWritten = 0;

    for (let i = 0; i < this.config.key_layer.layer_data.length; i++) {
      const layer = this.config.key_layer.layer_data[i].layer;

      for (let j = 0; j < layer.length; j++) {
        const rgba = layer[j].substring(1);
        const rgbaData = Buffer.from(rgba, 'hex');

        rgbaData.copy(layerBytes, lastWritten);
        lastWritten += rgbaData.length;
      }
    }

    const keyLayerCount = Math.ceil(lastWritten / 60);
    for (let i = 0; i < keyLayerCount; i++) {
      const keyframeInfo: KeyLayerInfoCommand = {
        usbFrameIndex: i,
        layerBytes: Buffer.alloc(0),
      };

      if ((i + 1) < keyLayerCount) {
        keyframeInfo.layerBytes = layerBytes.subarray(i * 60, (i + 1) * 60);
      } else {
        keyframeInfo.layerBytes = layerBytes.subarray(i * 60, lastWritten);
      }

      this.keyLayerInfos.push(keyframeInfo);
      this.commandCount += 1;
    }
  }
}
