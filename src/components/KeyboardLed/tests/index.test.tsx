/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import KeyboardLed from '..';

import store from '../../../store';
import { renderWithProviders } from '../../../utils/testHelpers';

describe('play/pause', () => {
  //
});

describe('speed', () => {
  //
});

describe('frame', () => {
  it('changes the frame to the frame slider', async () => {
    const display = renderWithProviders(<KeyboardLed />);
    const frameSlider = await display.findByTestId('keyboard-led-frame-slider');


  });
});
