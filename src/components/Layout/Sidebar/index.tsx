import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faDisplay, faKeyboard } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import './sidebar.css';

export default () => {
  return (
    <div className="sidebar text-white">
      <ul>
        <li className="sidebar-item hover:text-gray-400 mt-3 ml-2"><Link to="/display"><FontAwesomeIcon icon={faDisplay} className="sidebar-icon" /></Link></li>
        <li className="sidebar-item hover:text-gray-400 ml-3 mt-3"><Link to="/led"><FontAwesomeIcon icon={faLightbulb} className="sidebar-icon" /></Link></li>
        <li className="sidebar-item hover:text-gray-400 ml-2 mt-3"><Link to="/keyboard"><FontAwesomeIcon icon={faKeyboard} className="sidebar-icon" /></Link></li>
      </ul>
    </div>
  );
};
