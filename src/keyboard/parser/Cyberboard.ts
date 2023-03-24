import * as Schema from './schema';

interface UnknownCommand {
  pageIndex: number;
  wordNum: number;
  frameNum: number;
  keyframeNum: number;
}

export class Cyberboard {
  config: CyberboardConfig;
  commandCount: number;
  unknownCommands: UnknownCommand[];

  constructor(config: Schema.CyberboardConfig) {
    this.config = config;
    this.unknownCommands = [];
    this.commandCount = 0;

    this.preprocessCommands();
  }

  preprocessCommands() {
    for (const pageData: Schema.PageData in this.config.page_data) {
      let keyframeNum = 0;

      if (pageData.keyframes !== undefined) {
        keyframeNum = pageData.keyframes.frame_num;
      } else {
        const unknownCommand: UnknownCommand = {
          pageIndex: pageData.page_index,
          wordNum: pageData.word_page.word_len,
          frameNum: pageData.frames.frame_num,
          keyframeNum: keyframes,
        };

        this.unknownCommands.push(unknownCommand);
      }
    }
  }
}
