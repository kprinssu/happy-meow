import React from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import './body.css';

export default () => {
  return (
    <div className="content-body">
      <Routes>
        <Route path="/display" element={<h1>Display</h1>} />
        <Route path="/led" element={<h1>LED</h1>} />
        <Route path="/keyboard" element={<h1>Keyboard</h1>} />
      </Routes>
    </div>
  );
};
