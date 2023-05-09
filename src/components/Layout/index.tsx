import React from 'react';

import { HashRouter } from 'react-router-dom';

import './layout.css';

import Content from './Content';
import Sidebar from './Sidebar';

export default () => {
  return (
    <HashRouter>
      <div className="layout">
        <Sidebar></Sidebar>
        <Content></Content>
      </div>
    </HashRouter>
  );
};
