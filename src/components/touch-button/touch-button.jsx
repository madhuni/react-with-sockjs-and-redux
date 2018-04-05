import React from 'react';

const touchButton = (props) => {
  // onTouchStart = { props.touched }
  return (
    <button className={props.classValue}
      onTouchStart={props.touched}
      onTouchEnd={props.stop}
      onMouseDown={props.touched}
      onMouseUp={props.stop}
    >
      {props.name}
      {props.children}
    </button>
  );
};

export default touchButton;