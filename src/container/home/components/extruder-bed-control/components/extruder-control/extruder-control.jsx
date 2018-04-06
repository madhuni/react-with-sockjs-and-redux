import React from 'react';

import './extruder-control.css';

const extruderControl = (props) => {
  return (
    <div className="extruder-panel flex-row">
      <div className="temp-details">
        <div className="extruder-name">{props.name}</div>
        <img src={props.img} alt="Extruder" width="40" height="40"/>
        <div className="temps">
          <span className="actual-temp alert-text">{props.actual}&deg;</span>
          <span> / </span>
          <span className="target-temp">{props.target}&deg;</span>
        </div>
      </div>
      <div className="temp-control flex-row">
        <div className="heating-switch switch" onClick={props.heat}>
          <img src={props.heatSwitch} alt="Heat" width="60" height="60" className="image"/>
        </div>
        <div className="cooling-switch switch" onClick={props.cool}>
          <img src={props.coolSwitch} alt="Cool" width="60" height="60" className="image"/>
        </div>
      </div>
      <div className="extrude-control switch extrude-switch" onClick={props.extrude}>
        <img src={props.extrudeSwitch} alt="Extruder" width="60" height="60"/>
        {/* <p className="extrude-action">Extrude</p> */}
      </div>
    </div>
  );
}

export default extruderControl;