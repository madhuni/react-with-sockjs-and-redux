import React from 'react';

import './button.css';

const button = (props) => {
  return (
    <button className={props.classValue} onClick={props.clicked}>
      {props.name}
      {props.children}
    </button>  
  );
};

export default button;