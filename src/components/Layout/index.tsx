import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import './layout.css';

import Content from './Content';
import Sidebar from './Sidebar';

export default () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar></Sidebar>
        <Content></Content>
      </div>
    </BrowserRouter>
  );
};
