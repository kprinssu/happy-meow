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


