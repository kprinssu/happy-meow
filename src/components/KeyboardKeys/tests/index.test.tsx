/** @jest-environment jsdom */

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import KeyboardKeys  from '..';
import { renderWithProviders } from '../../../utils/testHelpers';

describe('keyboard keys', () => {
  it('changes the key to \'None\' when clicked', async () => {
    const display = renderWithProviders(<KeyboardKeys />);
    const escKey = await display.findByTestId('key-Esc');
    const preClick = escKey.getAttribute('data-key-value');

    act(() => fireEvent.click(escKey));
    const postClick = escKey.getAttribute('data-key-value');

    expect(postClick).not.toEqual(preClick);
    expect(postClick).toEqual('#000000');
  });

  it('changes the key value with the selected key when clicked', async () => {
    const display = renderWithProviders(<KeyboardKeys />);
    const escKey = await display.findByTestId('key-1');
    const preClick = escKey.getAttribute('data-key-value');

    // Change the selected key to 'K'
    const keySelector = await display.findByTestId('key-selector');
    act(() => fireEvent.change(keySelector, { target: { value: '#0007000e' } }));

    act(() => fireEvent.click(escKey));
    const postClick = escKey.getAttribute('data-key-value');

    expect(postClick).not.toEqual(preClick);
    expect(postClick).toEqual('#0007000e');
  });
});

describe('layer select', () => {
  it('changes the layer when clicked', async () => {
    // TODO: Implement
  });

  it('adds a new layer when the \'Add Layer\' button is clicked', async () => {
    // TODO: Implement
  });
});
