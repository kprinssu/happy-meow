/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import KeyboardLed from '..';

import { renderWithProviders } from '../../../utils/testHelpers';

describe('play/pause', () => {
  it('should play animation when the pause/play button is pressed', async () => {
    // Default state is paused
    jest.useFakeTimers();

    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const pausePlayButton = await display.findByTestId('keyboard-pause-play');

    const preAnimation = keyboardLED.getAttribute('data-test-frame-number');
    act(() => fireEvent.click(pausePlayButton));
    act(() => jest.advanceTimersByTime(250));

    const postAnimationFrame = keyboardLED.getAttribute('data-test-frame-number');
    expect(preAnimation).not.toEqual(postAnimationFrame);

    jest.useRealTimers();
  });

  it('should pause animation when the pause/play button is pressed', async () => {
    // Default state is paused
    jest.useFakeTimers();

    const display = renderWithProviders(<KeyboardLed />);
    const keyboardLED = await display.findByTestId('keyboard-led');
    const pausePlayButton = await display.findByTestId('keyboard-pause-play');

    const preAnimation = keyboardLED.getAttribute('data-test-frame-number');
    // Play
    act(() => fireEvent.click(pausePlayButton));

    // Pause
    act(() => fireEvent.click(pausePlayButton));

    act(() => jest.advanceTimersByTime(250));

    const postAnimationFrame = keyboardLED.getAttribute('data-test-frame-number');

    expect(preAnimation).toEqual(postAnimationFrame);

    jest.useRealTimers();
  });
});

describe('speed', () => {
  it('changes the animation speed to the speed slider', async () => {
    jest.useFakeTimers();

    const display = renderWithProviders(<KeyboardLed />);
    const keyboard = await display.findByTestId('keyboard-led');
    const speedSlider = await display.findByTestId('keyboard-speed-slider');

    const pausePlayButton = await display.findByTestId('keyboard-pause-play');
    act(() => fireEvent.click(pausePlayButton));


    const preAnimation = keyboard.getAttribute('data-test-frame-number');
    act(() => fireEvent.change(speedSlider, { target: { value: 50 } }));
    act(() => jest.advanceTimersByTime(1000));

    const postAnimationFrame = keyboard.getAttribute('data-test-frame-number');


    expect(preAnimation).not.toEqual(postAnimationFrame);

    jest.useRealTimers();
  });
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

    expect(preClickFrameCount).toEqual(100);
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

    // Attempt to remove all frames (by clicking the remove button 100 times)
    for (let i = 0; i < preClickFrameCount; i++) {
      act(() => fireEvent.click(removeButton));
    }

    const postClickFrameCount = parseInt(keyboardLED.getAttribute('data-test-frame-count') || '0');

    expect(postClickFrameCount).toEqual(1);
  });
});

describe('led colour', () => {
  it('should change the led colour when a led is clicked', async () => {
    const display = renderWithProviders(<KeyboardLed />);
    const preClickLed = await display.findByTestId('key-10');

    const preClickColour = preClickLed.style.backgroundColor;
    fireEvent.click(preClickLed);

    const postClickLed = await display.findByTestId('key-10');
    const postClickColour = postClickLed.style.backgroundColor;

    // rgb(255, 255, 255) is the default colour (white)
    expect(postClickColour).not.toEqual(preClickColour);
    expect(postClickColour).toEqual('rgb(255, 255, 255)');
  });
});
