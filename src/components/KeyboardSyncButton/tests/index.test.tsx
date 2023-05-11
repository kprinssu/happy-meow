/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import KeyboardSyncButton from '../index';

import store from '../../../store';
import { renderWithProviders } from '../../../utils/testHelpers';
import { setSelectedPort } from '../../../store/keyboardPort/actions';
import { CyberboardConfig } from '../../../keyboard/parser/schema';

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
      syncKeyboard: jest.fn(),
    };

    const syncButton = renderWithProviders(<KeyboardSyncButton />);
    const button = syncButton.getByTestId('sync-button');

    await act(async () => fireEvent.click(button));

    expect(window.keyboardAPI.setTime).toHaveBeenCalled();
    expect(window.keyboardAPI.syncKeyboard).toHaveBeenCalled();
  });
});
