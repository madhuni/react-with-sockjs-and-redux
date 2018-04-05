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
      <div className="temp-control">
        <img src={props.heatSwitch} alt="Heat" width="80" height="80" className="heating-switch switch" onClick={props.heat}/>
        <img src={props.coolSwitch} alt="Cool" width="80" height="80" className="cooling-switch switch" onClick={props.cool}/>
      </div>
      <div className="extrude-control">
        <img src={props.extrudeSwitch} alt="Extruder" width="80" height="80" className="switch extrude-switch" onClick={props.extrude}/>
        {/* <p className="extrude-action">Extrude</p> */}
      </div>
    </div>
  );
}

export default extruderControl;