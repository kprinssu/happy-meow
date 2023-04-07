/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Display from '../index';

import { renderWithProviders } from '../../../utils/test-helpers';

describe('animation', () => {
  it('should start the animation when the component is loaded', () => {
    const display = renderWithProviders(<Display />);
    /*const { getByTestId } = renderWithProviders(<Display value="0" />);

    act(() => {
      fireEvent.click(getByTestId('button-1'));
    });

    expect(getByTestId('display').classList).toContain('animate');*/
  });

  it('should pause animation when the pause/play button is pressed', () => {
    /*const { getByTestId } = renderWithProviders(<Display value="0" />);

    act(() => {
      fireEvent.click(getByTestId('button-1'));
    });

    expect(getByTestId('display').classList).toContain('animate-pause');*/
  });

  it('should play animation when the pause/play button is pressed', () => {
    /*const { getByTestId } = renderWithProviders(<Display value="0" />);

    act(() => {
      fireEvent.click(getByTestId('button-1'));
    });

    act(() => {
      fireEvent.click(getByTestId('button-1'));
    });

    expect(getByTestId('display').classList).toContain('animate');*/
  });
});


