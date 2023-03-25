import { Buffer } from 'buffer';

import * as Schema from './schema';

interface UnknownInfoCommand {
  pageIndex: number;
  wordNum: number;
  frameNum: number;
  keyframeNum: number;
}

interface PageControlInfo {
  valid: boolean;
  pageIndex: number;
  brightness: number;
  speed: number;
  color: Schema.Color;
}

interface PageControlInfoCommand {
  usbFrameCount: number;
  usbFrameIndex: number;
  pageNum: number;
  controlInfos: PageControlInfo[];
}

interface WordPageInfoCommand {
  frameIndex: number;
  pageIndex: number;
  valid: boolean;
  wordLen: number;
  unicode: string[];
}

interface RgbFrameInfoCommand {
  pageIndex: number;
  frameIndex: number;
  usbFrameIndex: number;
  frameRgb: Buffer;
}

interface KeyframeInfoCommand {
  pageIndex: number;
  frameIndex: number;
  usbFrameIndex: number;
  frameRgb: Buffer;
}

interface ExtendKeyInfoCommand extends Schema.ExchangeKey {
}

interface TabKeyInfoCommand extends Schema.TabKey {
}

interface FunctionKeyInfoCommand {
  functionKeyCount: number;
  keyNumber: number;
  functionKeys: Schema.FunctionKey[];
}

interface MacroKeyInfoCommand extends Schema.MacroKey {
}

interface SwapKeyInfoCommand {
  swapKeyCount: number;
  keyNumber: number;
  swapKeys: Schema.SwapKey[];
}

interface KeyLayerInfoCommand {
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
  exchangeKeyInfos: ExtendKeyInfoCommand[];
  tabKeyInfos: TabKeyInfoCommand[];
  functionKeyInfos: FunctionKeyInfoCommand[];
  macroKeyInfos: MacroKeyInfoCommand[];
  swapKeyInfos: SwapKeyInfoCommand[];
  keyLaferInfos: KeyLayerInfoCommand[];

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
    this.keyLaferInfos = [];

    this.preprocessCommands();
  }

  preprocessCommands() {
    // Process the Page Data for Unknown Commands
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      let keyframeNum = 0;

      if (pageData.keyframes !== undefined) {
        keyframeNum = pageData.keyframes.frame_num;
      } else {
        const unknownCommand: UnknownInfoCommand = {
          pageIndex: pageData.page_index,
          wordNum: pageData.word_page.word_len,
          frameNum: pageData.frames.frame_num,
          keyframeNum: keyframeNum,
        };

        this.unknownInfos.push(unknownCommand);
      }
    }

    this.commandCount += 1;

    // Process the Page Control Commands
    const pageControlCount = Math.ceil(this.config.page_num / 4);
    for (let i = 0; i < pageControlCount; i++) {
      const pageControlInfoItems: PageControlInfo[] = [];

      if (4 * (i + 1) > this.config.page_num) {
        const currentPageNum = this.config.page_num % 4;
        const pageDataSet = this.config.page_data.slice(4 * i, this.config.page_num);

        this.createPageControlCommands(pageControlInfoItems, pageDataSet)
      } else {
        const currentPageNum = 4;
        const pageDataSet = this.config.page_data.slice(4 * i, 4 * i + 4);

        this.createPageControlCommands(pageControlInfoItems, pageDataSet)

        this.commandCount += 1;
        const pageControlInfoCommand: PageControlInfoCommand = {
          usbFrameCount: pageControlCount,
          usbFrameIndex: i,
          pageNum: currentPageNum,
          controlInfos: pageControlInfoItems,
        };

        this.pageControlInfos.push(pageControlInfoCommand);
      }
    }

    // Process the Word Page
    let wordPageCount = pageControlCount;
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      const wordPage = pageData.word_page;

      if (wordPage.word_len !== 0) {
        wordPageCount = Math.ceil(wordPage.word_len / 28);
      }

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
          pageIndex: pageData.page_index,
          valid: valid,
          wordLen: wordLen,
          unicode: selectedUnicode,
        };

        this.commandCount += 1;
        this.wordPageInfos.push(wordPageInfo);
      }
    }

    // Process the RGB Frames
    let frameCount = wordPageCount;
    for (let i = 0; i < this.config.page_num; i++) {
      const pageData = this.config.page_data[i];
      const frames = pageData.frames;

      if (frames.frame_num !== 0) {
        frameCount = 11;
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

        // USB Frame Index is constant at 10 (no idea why)
        let rgbFrameInfo: RgbFrameInfoCommand = {
          pageIndex: pageData.page_index,
          frameIndex: frameData.frame_index,
          usbFrameIndex: 10,
          frameRgb: frameRgb.subarray(560, 600),
        };

        this.commandCount += 1;
        this.rgbFrameInfos.push(rgbFrameInfo);
      }
    }

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

        // USB Frame Index is constant at 4 (no idea why)
        const keyframeInfo: KeyframeInfoCommand = {
          pageIndex: pageData.page_index,
          frameIndex: frameData.frame_index,
          usbFrameIndex: 4,
          frameRgb: frameRgb.subarray(224, 270),
        };

        this.keyframeInfos.push(keyframeInfo);
        this.commandCount += 1;
      }
    }

    // Process the Exchange Keys
    for (let i = 0; i < this.config.exchange_key.length; i++) {
      const exchangeKey = this.config.exchange_key[i] as ExtendKeyInfoCommand;
      this.exchangeKeyInfos.push(exchangeKey);
      this.commandCount += 1;
    }

    // Process the Tab Keys
    for (let i = 0; i < this.config.tab_key.length; i++) {
      const tabKey = this.config.tab_key[i] as TabKeyInfoCommand;
      this.tabKeyInfos.push(tabKey);
      this.commandCount += 1;
    }

    // Process the Function Keys
    let functionKeyCount = Math.ceil(this.config.Fn_key_num / 11);
    for (let i = 0; i < functionKeyCount; i++) {
      // Note: This loop won't execute when i = 0
      // this may be a bug even in the AM software
      if ((i + 1) === functionKeyCount) {
        continue;
      }

      const functionKeyInfo: FunctionKeyInfoCommand = {
        functionKeyCount: this.config.Fn_key_num,
        keyNumber: 11,
        functionKeys: this.config.Fn_key.slice(11 * i, 11 * (i + 1)),
      };

      this.functionKeyInfos.push(functionKeyInfo);
      this.commandCount += 1;
    }

    // Process the Macro Keys
    for (let i = 0; i < this.config.MACRO_key.length; i++) {
      const macroKeyInfo = this.config.MACRO_key[i] as MacroKeyInfoCommand;
      this.macroKeyInfos.push(macroKeyInfo);
      this.commandCount += 1;
    }

    // Process the Swap Keys
    let swapKeyCount = Math.ceil(this.config.swap_key_num/ 11)
    for (let i = 0; i < swapKeyCount; i++) {
      // Note: Just as with funcion keys, this loop
      // will not run when i = 0 and is found in AM software too
      if ((i + 1) === swapKeyCount) {
        continue;
      }

      const swapKeyInfo: SwapKeyInfoCommand = {
        swapKeyCount: this.config.swap_key_num,
        keyNumber: 11,
        swapKeys: this.config.swap_key.slice(11 * i, 11 * (i + 1)),
      };

      this.swapKeyInfos.push(swapKeyInfo);
      this.commandCount += 1;
    }

    // TODO: Implement Hatsu later

    // Process Key Layer
    this.processKeyLayer();

    // console.log(this.commandCount + ' ' + this.swapKeyInfos.length);
  }

  createPageControlCommands(pageControlInfoItems: PageControlInfo[], pageDataSet: Schema.PageData[]) {
    // Create the PageControl
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
  }

  processKeyLayer() {
    if (!this.config.key_layer.valid) {
      return;
    }

     // TODO: Make this more sane than the arbitrary size of 10000
    const layerBytes = Buffer.alloc(10000);
    let lastWritten = 0;


    // TODO: Verify that this works as this is an assumption and
    // not based on the AM outputs
    for (let i = 0; i < this.config.key_layer.layer_data.length; i++) {
      const layer = this.config.key_layer.layer_data[i].layer;

      for (let j = 0; j < layer.length; j++) {
        const rgba = layer[j].substring(1);
        const rgbaData = Buffer.from(rgba);

        rgbaData.copy(layerBytes, lastWritten);
        lastWritten += rgbaData.length;
      }
    }

    // Note: No idea why this is 40
    for (let i = 0; i < 40; i++) {
      const keyframeInfo: KeyLayerInfoCommand = {
        usbFrameIndex: i,
        layerBytes: layerBytes.subarray(i * 60, (i + 1) * 60),
      };

      this.keyLaferInfos.push(keyframeInfo);
      this.commandCount += 1;
    }
  }
}
