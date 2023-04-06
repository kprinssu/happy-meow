import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faDisplay, faKeyboard } from '@fortawesome/free-solid-svg-icons'

import {
  Link
} from 'react-router-dom';

import './sidebar.css';

export default () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item"><Link to="/display"><FontAwesomeIcon icon={faDisplay} /></Link></li>
        <li className="sidebar-item"><Link to="/led"><FontAwesomeIcon icon={faLightbulb} /></Link></li>
        <li className="sidebar-item"><Link to="/keyboard"><FontAwesomeIcon icon={faKeyboard} /></Link></li>
      </ul>
    </div>
  );
};
