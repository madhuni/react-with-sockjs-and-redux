import React from 'react';

import './backdrop.css';

const backdrop = (props) => {
  return (
    <div className="backdrop" onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default backdrop;