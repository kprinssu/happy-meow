import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faDisplay, faKeyboard } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';

import './sidebar.css';

export default () => {
  return (
    <div className="sidebar text-white">
      <ul>
        <li className="sidebar-item hover:text-gray-400 mt-3 mx-3"><Link to="/display"><FontAwesomeIcon icon={faDisplay} className="h-10" /></Link></li>
        <li className="sidebar-item hover:text-gray-400 m-5"><Link to="/led"><FontAwesomeIcon icon={faLightbulb} className="h-10" /></Link></li>
        <li className="sidebar-item hover:text-gray-400 m-5 mx-3"><Link to="/keyboard"><FontAwesomeIcon icon={faKeyboard} className="h-10" /></Link></li>
      </ul>
    </div>
  );
};
