import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faDisplay, faKeyboard } from '@fortawesome/free-solid-svg-icons'

import './sidebar.css';

export default () => {
  return (
    <div className="sidebar">
      <ul>
        <li><FontAwesomeIcon icon={faDisplay} /></li>
        <li><FontAwesomeIcon icon={faLightbulb} /></li>
        <li><FontAwesomeIcon icon={faKeyboard} /></li>
      </ul>
    </div>
  );
};
