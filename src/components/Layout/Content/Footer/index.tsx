import React from 'react';

import KeyboardSelector from './children/KeyboardSelector';
import KeyboardSyncButton from './children/KeyboardSyncButton';
import './footer.css';

export default () => {
  return (
    <div className="content-footer">
      <KeyboardSelector />
      <KeyboardSyncButton />
    </div>
  );
};
