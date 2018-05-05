import React from 'react';

import './nav-bar.css'
import powerbtn from '../../../../assets/images/power-icon.svg';

const navBar = (props) => {
  return (
    <nav className="nav-bar flex-row">
      <h1 className="current-state">Status: {props.currentState}</h1>
      <div className="shutdown-btn">
        <img src={powerbtn} alt="Power" width="36" height="36" onClick={props.shutdown}/>
      </div>
    </nav>
  );
};

export default navBar;