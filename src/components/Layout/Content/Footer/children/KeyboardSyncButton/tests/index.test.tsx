/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import KeyboardSyncButton from '../index';

import store from '../../../../../../../store';
import { renderWithProviders } from '../../../../../../../utils/testHelpers';
import { PortInfo } from '../../../../../../../store/keyboardPort/types';
import { setSelectedPort } from '../../../../../../../store/keyboardPort/actions';

describe('sync button', () => {
  it('starts the sync to the currently selected keyboard', async () => {
    const mockKeyboard: PortInfo = {
      vendorId: '05ac',
      productId: '0256',
      path: '/dev/AM00',
      pnpId: 'Happy Meow',
      manufacturer: 'kprinssu mock',
      serialNumber: '1234567890',
      locationId: 'Happy Meow Test',
    };

    await store.dispatch(setSelectedPort(mockKeyboard));

    window.keyboardAPI = {
      ...window.keyboardAPI,
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
