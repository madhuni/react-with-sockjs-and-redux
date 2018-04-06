import React from 'react';

import './button.css';

const buttonDisable = (props) => {
  return (
    <button className={props.classValue} disabled>
      {props.children}
    </button>
  );
};

export default buttonDisable;