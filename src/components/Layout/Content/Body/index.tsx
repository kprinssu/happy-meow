import React from 'react';

import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './body.css';

import Display from './children/Display';
import KeyboardLed from './children/KeyboardLed';
import KeyboardKeys from './children/KeyboardKeys';
import Settings from './children/Settings';

export default () => {
  return (
    <div className="content-body">
      <Routes>
        <Route path="/" element={<Navigate to='/display' replace />} />
        <Route path="/display" element={<Display />} />
        <Route path="/led" element={<KeyboardLed />} />
        <Route path="/keyboard" element={<KeyboardKeys />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
