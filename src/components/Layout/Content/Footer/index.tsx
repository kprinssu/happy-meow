import React from 'react';

import KeyboardSelector from '../../../KeyboardSelector';
import KeyboardSyncButton from '../../../KeyboardSyncButton';
import './footer.css';

export default () => {
  return (
    <div className="content-footer">
      <KeyboardSelector />
      <KeyboardSyncButton />
    </div>
  );
};
