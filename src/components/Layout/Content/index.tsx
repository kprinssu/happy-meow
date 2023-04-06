import React from 'react';

import Body from './Body';
import Footer from './Footer';

import './content.css';

export default () => {
  return (
    <div className="content">
      <div className="content-wrapper">
        <Body>
        </Body>

        <Footer></Footer>
      </div>
    </div>
  );
};
