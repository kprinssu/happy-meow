type KeyboardKeyConstants = {
  [key: string]: string;
};

export const KEYBOARD_KEYS: KeyboardKeyConstants = {
  'Escape': '00070029',
  'F1': '0007003a',
  'F2': '0007003b',
  'F3': '0007003c',
  'F4': '0007003d',
  'F5': '0007003e',
  'F6': '0007003f',
  'F7': '00070040',
  'F8': '00070041',
  'F9': '00070042',
  'F10': '00070043',
  'F11': '00070044',
  'F12': '00070045',
  '~': '00070035',
  '1': '0007001e',
  '2': '0007001f',
  '3': '00070020',
  '4': '00070021',
  '5': '00070022',
  '6': '00070023',
  '7': '00070024',
  '8': '00070025',
  '9': '00070026',
  '0': '00070027',
  '-': '0007002d',
  '=': '0007002e',
  'Backspace': '0007002a',
  'Tab': '0007002b',
  'Q': '00070014',
  'W': '0007001a',
  'E': '00070008',
  'R': '00070015',
  'T': '00070017',
  'Y': '0007001c',
  'U': '00070018',
  'I': '0007000c',
  'O': '00070012',
  'P': '00070013',
  '[': '0007002f',
  ']': '00070030',
  '\\': '00070031',
  'CapsLock': '00070039',
  'A': '00070004',
  'S': '00070016',
  'D': '00070007',
  'F': '00070009',
  'G': '0007000a',
  'H': '0007000b',
  'J': '0007000d',
  'K': '0007000e',
  'L': '0007000f',
  ';': '00070033',
  '\'': '00070034',
  'Enter': '00070028',
  'Left Shift': '000700e1',
  'Z': '0007001d',
  'X': '0007001b',
  'C': '00070006',
  'V': '00070019',
  'B': '00070005',
  'N': '00070011',
  'M': '00070010',
  ',': '00070036',
  '.': '00070037',
  '/': '00070038',
  'Right Shift': '000700e5',
  'Right Ctrl': '000700e4',
  'Left Alt': '000700e2',
  'Left Win': '000700e3',
  'Space': '0007002c',
  'Fn': '00920C0B',
  'Right Alt': '000700e6',
  'Up Arrow': '00070052',
  'Down Arrow': '00070051',
  'Left Arrow': '00070050',
  'Right Arrow': '0007004f',
};

export const KEYBOARD_CODE_TO_KEY = (keyCode: string): string | null => {
  return Object.keys(KEYBOARD_KEYS).find((k) => {
    return KEYBOARD_KEYS[k] === keyCode;
  }) || null;
};
