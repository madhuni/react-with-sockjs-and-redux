import React from 'react';

import './files-list.css';

const filesList = (props) => {
  return (
    <ul className="files-list">
      {props.children}
    </ul>
  );
};

export default filesList;