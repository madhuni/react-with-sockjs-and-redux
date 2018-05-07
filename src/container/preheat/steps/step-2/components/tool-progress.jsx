import React from 'react';

import './tool-progress.css';
import ProgressBar from '../../../../../components/progress-bar/progress-bar';

const toolProgress = (props) => {
  const actualTemp = Math.min(Math.round(props.temps.actual));
  const targetTemp = Math.min(Math.round(props.target));

  return (
    <div className="tool-progress">
      <div className="tool flex-row">
        <img src={props.image} alt="Tool" width="64" height="64"/>
        <div className="tool-details">
          <p>{props.name} Temperature</p>
          <p className="temps"><span className="actual-temp">{actualTemp} &#8451;</span> / {targetTemp} &#8451;</p>
        </div>
      </div>
      <ProgressBar percentage={props.percentage}/>
    </div>
  );
};

export default toolProgress;