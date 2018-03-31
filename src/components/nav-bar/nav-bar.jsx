import React from 'react';

import './nav-bar.css';

const navBar = (props) => {
  return (
    <nav className="global-nav-bar flex-row">
      {props.children}
    </nav>
  );
};

export default navBar;