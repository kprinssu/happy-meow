/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Display from '../index';

import { renderWithProviders } from '../../../utils/test-helpers';

describe('animation', () => {
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
    expect(pausePlayButton.textContent).toEqual('Pause');

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
    expect(pausePlayButton.textContent).toEqual('Play');

    jest.useRealTimers();
  });

  it('changes the animation speed to the speed slider', async () => {
    jest.useFakeTimers();

    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const speedSlider = await display.findByTestId('display-speed-slider');

    const preAnimation = grid.getAttribute('data-test-frame-number');
    act(() => fireEvent.change(speedSlider, { target: { value: 3 } }));
    act(() => jest.advanceTimersByTime(10000));
    const postAnimationFrame = grid.getAttribute('data-test-frame-number');

    expect(preAnimation).not.toEqual(postAnimationFrame);

    jest.useRealTimers();
  });
});

describe('layer selection', () => {
  test('should change the layer when a layer 1 is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const layerText = await display.findByTestId('display-layer');

    const layer1 = await display.findByTestId('display-layer-frame-1');
    act(() => fireEvent.click(layer1));

    expect(layerText.textContent).toEqual('Layer 1');
  });

  test('should change the layer when a layer 2 is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const layerText = await display.findByTestId('display-layer');

    const layer2 = await display.findByTestId('display-layer-frame-2');
    act(() => fireEvent.click(layer2));

    expect(layerText.textContent).toEqual('Layer 2');
  });

  test('should change the layer when a layer 3 is clicked', async () => {
    const display = renderWithProviders(<Display />);
    const grid = await display.findByTestId('display-led-grid');
    const layerText = await display.findByTestId('display-layer');

    const layer3 = await display.findByTestId('display-layer-frame-3');
    act(() => fireEvent.click(layer3));

    expect(layerText.textContent).toEqual('Layer 3');
  });
});

