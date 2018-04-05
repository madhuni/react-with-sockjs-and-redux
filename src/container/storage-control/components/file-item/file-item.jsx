import React from 'react';

import './file-item.css';

const fileItem = (props) => {
  return (
    <li className="file-item" onClick={props.print}>
      {props.children}
    </li>
  );
};

export default fileItem;