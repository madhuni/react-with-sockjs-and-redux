import React from 'react';

import './bed-control.css';

const bedControl = (props) => {
  return (
    <div className="bed-panel flex-row">
      <div className="temp-details">
        <div className="bed-name extruder-name">Bed</div>
        <img src={props.img} alt="Bed" width="60" height="60" />
        <div className="temps">
          <span className="actual-temp alert-text">{props.actual}&deg;</span>
          <span> / </span>
          <span className="target-temp">{props.target}&deg;</span>
        </div>
      </div>
      <div className="temp-control">
        <div className="heating-switch switch" onClick={props.heat}>
          <img src={props.heatSwitch} alt="Heat" width="60" height="60" />
        </div>
        <div className="cooling-switch switch" onClick={props.cool}>
          <img src={props.coolSwitch} alt="Cool" width="60" height="60" />
        </div>
      </div>
    </div>
  );
}

export default bedControl;