/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { PortInfo } from '@serialport/bindings-cpp';

import KeyboardSelector from '../index';

import { renderWithProviders } from '../../../../../../../utils/testHelpers';
import store from '../../../../../../../store';

const mockKeyboard: PortInfo = {
  vendorId: '05ac',
  productId: '0256',
  path: '/dev/AM00',
  pnpId: 'Happy Meow',
  manufacturer: 'kprinssu mock',
  serialNumber: '1234567890',
  locationId: 'Happy Meow Test',
};

beforeEach(() => {
  window.keyboardAPI = {
    ...window.keyboardAPI,
    listKeyboards: () => {
      return new Promise<PortInfo[]>((resolve) => {
        resolve([mockKeyboard]);
      });
    },
  };
});

describe('connected Cyberboards', () => {
  it('renders all the Cyberboards in the dropdown', async () => {
    const selector = await act(async () => {
      return renderWithProviders(<KeyboardSelector />);
    });

    const select =  await selector.getByTestId('keyboard-port-selector') as HTMLSelectElement;
    const options = Array.from(select.options);
    const keyValues = options.map ((o) => [o.value, o.text]);
    const expectedKeyValues = [ [ 'Select a Keyboard', 'Select a Keyboard' ], [ '0', 'Happy Meow' ] ];
    expect(keyValues).toEqual(expectedKeyValues);
  });
});

describe('selected keyboard', () => {
  it('updates and sets the state to the selected keyboard', async () => {
    const selector = await act(async () => {
      return renderWithProviders(<KeyboardSelector />);
    });

    const select = selector.getByTestId('keyboard-port-selector') as HTMLSelectElement;

    await act(async () => fireEvent.change(select, { target: { value: '0', }, }));
    const state = store.getState();
    expect(state.keyboardPorts.selectedPort).toEqual(mockKeyboard);
  });
});
