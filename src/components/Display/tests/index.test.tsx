/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Display from '../index';

import store from '../../../store';
import { renderWithProviders } from '../../../utils/testHelpers';

describe('play/pause', () => {
  it('should play animation when the pause/play button is pressed', async () => {
    jest.useFakeTimers();

    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const pausePlayButton = await display.findByTestId('display-pause-play');

    const preAnimation = grid.getAttribute('data-test-frame-number');
    act(() => fireEvent.click(pausePlayButton));
    act(() => jest.advanceTimersByTime(250));
    const postAnimationFrame = grid.getAttribute('data-test-frame-number');

    expect(preAnimation).not.toEqual(postAnimationFrame);
    // expect(pausePlayButton.textContent).toEqual('Pause');

    jest.useRealTimers();
  });

  it('should pause animation when the pause/play button is pressed', async () => {
    jest.useFakeTimers();

    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const pausePlayButton = await display.findByTestId('display-pause-play');

    const preAnimation = grid.getAttribute('data-test-frame-number');
    // Pause
    act(() => fireEvent.click(pausePlayButton));
    // Play
    act(() => fireEvent.click(pausePlayButton));
    act(() => jest.advanceTimersByTime(250));
    const postAnimationFrame = grid.getAttribute('data-test-frame-number');

    expect(preAnimation).toEqual(postAnimationFrame);
    // expect(pausePlayButton.textContent).toEqual('Play');

    jest.useRealTimers();
  });
});

describe('speed', () => {
  it('changes the animation speed to the speed slider', async () => {
    jest.useFakeTimers();

    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const speedSlider = await display.findByTestId('display-speed-slider');

    const pausePlayButton = await display.findByTestId('display-pause-play');
    act(() => fireEvent.click(pausePlayButton));


    const preAnimation = grid.getAttribute('data-test-frame-number');
    act(() => fireEvent.change(speedSlider, { target: { value: 50 } }));
    act(() => jest.advanceTimersByTime(1000));

    const postAnimationFrame = grid.getAttribute('data-test-frame-number');


    expect(preAnimation).not.toEqual(postAnimationFrame);

    jest.useRealTimers();
  });
});

describe('frame slider', () => {
  it('changes the animation frame according to the frame slider value', async () => {
    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const frameSlider = await display.findByTestId('display-frame-slider');

    const frame = 77;
    act(() => fireEvent.change(frameSlider, { target: { value: frame } }));
    const gridFrame = grid.getAttribute('data-test-frame-number');
    expect(gridFrame).toEqual(frame.toString());
  });
});

describe('frame inserts and removal', () => {
  it('should insert a frame when the insert button is pressed', async () => {
    const display = renderWithProviders(<Display />);
    const insertButton = await display.findByTestId('display-insert-frame');

    const preInsertMaxFrame = store.getState().keyboardDisplay.layers[0].frames.length;
    act(() => fireEvent.click(insertButton));
    const postInsertMaxFrame = store.getState().keyboardDisplay.layers[0].frames.length;

    expect(postInsertMaxFrame).toEqual(preInsertMaxFrame + 1);
  });

  it('should remove a frame when the remove button is pressed', async () => {
    const display = renderWithProviders(<Display />);
    const removeButton = await display.findByTestId('display-remove-frame');

    const preRemoveMaxFrame = store.getState().keyboardDisplay.layers[0].frames.length;
    act(() => fireEvent.click(removeButton));
    const postRemoveMaxFrame = store.getState().keyboardDisplay.layers[0].frames.length;

    expect(postRemoveMaxFrame).toEqual(preRemoveMaxFrame - 1);
  });
});

describe('layer selection', () => {
  it('should change the layer when a layer 1 is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const layerText = await display.findByTestId('display-layer');

    const layer1 = await display.findByTestId('display-layer-frame-1');
    act(() => fireEvent.click(layer1));

    expect(layerText.textContent).toEqual('Layer 1');
  });

  it('should change the layer when a layer 2 is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const layerText = await display.findByTestId('display-layer');

    const layer2 = await display.findByTestId('display-layer-frame-2');
    act(() => fireEvent.click(layer2));

    expect(layerText.textContent).toEqual('Layer 2');
  });

  it('should change the layer when a layer 3 is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const layerText = await display.findByTestId('display-layer');

    const layer3 = await display.findByTestId('display-layer-frame-3');
    act(() => fireEvent.click(layer3));

    expect(layerText.textContent).toEqual('Layer 3');
  });
});

describe('led colour', () => {
  it('should change the led colour when a led is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const preClickLed = await display.findByTestId('display-led-10');

    const preClickColour = preClickLed.style.backgroundColor;
    fireEvent.click(preClickLed);

    const postClickLed = await display.findByTestId('display-led-10');
    const postClickColour = postClickLed.style.backgroundColor;

    // rgb(255, 255, 255) is the default colour (white)
    expect(postClickColour).not.toEqual(preClickColour);
    expect(postClickColour).toEqual('rgb(255, 255, 255)');
  });
});
