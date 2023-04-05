import React from 'react';

import './layout.css';

import Content from './Content';
import Sidebar from './Sidebar';

export default () => {
  return (
    <div className="layout">
       <Sidebar>
      </Sidebar>
      <Content></Content>
    </div>
  );
};
