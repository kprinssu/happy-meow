import React from 'react';

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './body.css';

import Display from '../../../Display';
import KeyboardLed from '../../../KeyboardLed';
import KeyboardKeys from '../../../KeyboardKeys';

export default () => {
  return (
    <div className="content-body">
      <Routes>
        <Route path="/" element={<Navigate to='/display' replace />} />
        <Route path="/display" element={<Display />} />
        <Route path="/led" element={<KeyboardLed />} />
        <Route path="/keyboard" element={<KeyboardKeys />} />
      </Routes>
    </div>
  );
};
