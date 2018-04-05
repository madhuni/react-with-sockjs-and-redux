import React from 'react';

import './backdrop.css';

const backdrop = (props) => {
  const backdropClass = ['backdrop'];
  if (props.modalOpen) {
    backdropClass.push('backdrop-open');
  } else {
    backdropClass.push('backdrop-close');
  }
  return (
    <div className={backdropClass.join(" ")} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default backdrop;