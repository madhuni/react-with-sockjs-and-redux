import React, { Component } from 'react';

import './bed-control.css';

const bedControl = (props) => {
  return (
    <div className="bed-panel flex-row">
      <div className="temp-details">
        <div className="bed-name extruder-name">Bed</div>
        <img src={props.img} alt="Bed Image" width="60" height="60" />
        <div className="temps">
          <span className="actual-temp alert-text">{props.actual}&deg;</span>
          <span> / </span>
          <span className="target-temp">{props.target}&deg;</span>
        </div>
      </div>
      <div className="temp-control">
        <img src={props.heatSwitch} alt="Heat" width="80" height="80" className="heating-switch switch" onClick={props.heat}/>
        <img src={props.coolSwitch} alt="Cool" width="80" height="80" className="cooling-switch switch" onClick={props.cool}/>
      </div>
    </div>
  );
}

export default bedControl;