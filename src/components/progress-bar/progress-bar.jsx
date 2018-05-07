import React from 'react';

import './progress-bar.css';

const progressBar = (props) => {
  const percentage = props.percentage + '%';
  const style = {width: percentage};
  return (
    <div className="progress-bar">
      <div className="progress" style={style}></div>
    </div>
  );
};

export default progressBar;
