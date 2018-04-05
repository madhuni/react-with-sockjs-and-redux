import React from 'react';

import './nav-link-btn.css';

const navLinkBtn = (props) => {
  return (
    <div className="nav-link-container flex-row">
      {props.children}
    </div>
  );
};

export default navLinkBtn;