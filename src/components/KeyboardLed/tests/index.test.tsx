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

describe('frame slider', () => {
  it('changes the animation frame according to the frame slider value', async () => {
    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const frameSlider = await display.findByTestId('keyboard-led-frame-slider');

    const frame = 77;
    act(() => fireEvent.change(frameSlider, { target: { value: frame } }));
    const keyboardFrame = keyboardLED.getAttribute('data-test-frame-number');
    expect(keyboardFrame).toEqual(frame.toString());
  });
});

describe('frame insertion', () => {
  it('inserts a frame after the current frame', async () => {
    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const insertButton = await display.findByTestId('keyboard-insert-frame');

    // Change to Layer 2 (layer 2 does not have a 100 frames by default)
    const layer2Button = await display.findByTestId('keyboard-led-layer-frame-2');
    act(() => fireEvent.click(layer2Button));

    const preClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');
    act(() => fireEvent.click(insertButton));
    const postClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');

    expect(postClickFrameCount).toEqual(preClickFrameCount + 1);
  });

  it('does not insert a frame when the  max number of frames is reached', async () => {

    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const insertButton = await display.findByTestId('keyboard-insert-frame');

    const preClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');
    act(() => fireEvent.click(insertButton));
    const postClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');


    // Frame length starts at 0 (array indices)
    expect(preClickFrameCount).toEqual(99);
    expect(preClickFrameCount).toEqual(postClickFrameCount);
  });
});

describe('frame removal', () => {
  it('removes the current frame', async () => {
    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const removeButton = await display.findByTestId('keyboard-remove-frame');

    const preClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');
    act(() => fireEvent.click(removeButton));
    const postClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');

    expect(postClickFrameCount).toEqual(preClickFrameCount - 1);
  });

  it('does not remove the last frame', async () => {
    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const removeButton = await display.findByTestId('keyboard-remove-frame');

    const preClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');

    // Attempt to remove all frames
    for (let i = 0; i < preClickFrameCount; i++) {
      //act(() => fireEvent.click(removeButton));
      //console.log(i, keyboardLED.getAttribute('data-test-frame-count'));
    }

    const postClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');

    //console.log(preClickFrameCount, postClickFrameCount);
    //expect(postClickFrameCount).toEqual(1);
  });
});
