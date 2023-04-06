/** @jest-environment jsdom */

import { waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import KeyboardSyncButton from '../index';

import store from '../../../store';
import { renderWithProviders } from '../../../utils/test-helpers';
import { setSelectedPort } from '../../../store/keyboardPort/actions';

describe('sync button', () => {
  it('starts the sync to the currently selected keyboard', async () => {
    const mockKeyboard = {
      vendorId: '05ac',
      productId: '0256',
      path: '/dev/AM00',
      pnpId: 'Happy Meow'
    };
    await store.dispatch(setSelectedPort(mockKeyboard));

    window.keyboardAPI = {
      setTime: jest.fn(),
    };

    const syncButton = renderWithProviders(<KeyboardSyncButton />);
    const button = await syncButton.getByTestId('sync-button');

    await act(async () => fireEvent.click(button));
    expect(window.keyboardAPI.setTime).toHaveBeenCalledWith(mockKeyboard.path);

    //expect(state.keyboardPorts.selectedPort).toEqual(mockKeyboard);
  });
});
