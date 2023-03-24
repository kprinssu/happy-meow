import * as Schema from './schema';

interface UnknownCommand {
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

export class Cyberboard {
  config: Schema.CyberboardConfig;
  commandCount: number;
  unknownCommands: UnknownCommand[];
  pageControlInfos: PageControlInfoCommand[];
  wordPageInfos: WordPageInfoCommand[];

  constructor(config: Schema.CyberboardConfig) {
    this.config = config;
    this.commandCount = 0;
    this.unknownCommands = [];
    this.pageControlInfos = [];
    this.wordPageInfos = [];

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
        const unknownCommand: UnknownCommand = {
          pageIndex: pageData.page_index,
          wordNum: pageData.word_page.word_len,
          frameNum: pageData.frames.frame_num,
          keyframeNum: keyframeNum,
        };

        this.unknownCommands.push(unknownCommand);
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

    console.log(this.commandCount);
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
}
