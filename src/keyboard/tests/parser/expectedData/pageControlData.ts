import * as CyberboardTypes from '../../../parser/Cyberboard';

const controlInfos1: CyberboardTypes.PageControlInfo[] = [
  {
    valid: true,
    pageIndex: 0,
    brightness: 100,
    speed: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000',
    },
  },
  {
    valid: true,
    pageIndex: 1,
    brightness: 100,
    speed: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000',
    },
  },
  {
    valid: true,
    pageIndex: 2,
    brightness: 100,
    speed: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#ffffff',
    },
  },
  {
    valid: false,
    pageIndex: 3,
    brightness: 100,
    speed: 50,
    color: {
      default: true,
      back_rgb: '#000500',
      rgb: '#F91D00',
    },
  }
];

const controlInfos2: CyberboardTypes.PageControlInfo[] = [
  {
    valid: false,
    pageIndex: 4,
    brightness: 100,
    speed: 50,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000',
    },
  },
  {
    valid: true,
    pageIndex: 5,
    brightness: 100,
    speed: 100,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000',
    },
  },
  {
    valid: true,
    pageIndex: 6,
    brightness: 100,
    speed: 34,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000',
    },
  },
  {
    valid: true,
    pageIndex: 7,
    brightness: 100,
    speed: 34,
    color: {
      default: false,
      back_rgb: '#000000',
      rgb: '#000000',
    },
  }
];

export const expectedPageControl: CyberboardTypes.PageControlInfoCommand[] = [
  {
    usbFrameCount: 2,
    usbFrameIndex: 0,
    pageNum: 4,
    controlInfos: controlInfos1,
  },
  {
    usbFrameCount: 2,
    usbFrameIndex: 1,
    pageNum: 4,
    controlInfos: controlInfos2,
  }
];
