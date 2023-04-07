import React from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import './body.css';

import Display from '../../../Display';

export default () => {
  return (
    <div className="content-body">
      <Routes>
        <Route path="/display" element={<Display />} />
        <Route path="/led" element={<h1>LED</h1>} />
        <Route path="/keyboard" element={<h1>Keyboard</h1>} />
      </Routes>
    </div>
  );
};
