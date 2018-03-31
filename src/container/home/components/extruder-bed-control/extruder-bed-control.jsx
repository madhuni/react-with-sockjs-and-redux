import React, { Component } from 'react';

import './extruder-bed-control.css';
import ExtruderControl from './components/extruder-control/extruder-control';
import BedControl from './components/bed-control/bed-control';

import bedImage from '../../../../assets/images/bed-plate.svg';
import exd1Image from '../../../../assets/images/extruder-1.svg';
import exd2Image from '../../../../assets/images/extruder-2.svg';
import heatSwitch from '../../../../assets/images/heating-icon.png';
import coolSwitch from '../../../../assets/images/cooling-icon.png';
import extrudeSwitch from '../../../../assets/images/extrude-icon.png';

const extruderBedControl = (props) => {
  return (
    <div className="extruder-bed-area flex-col">
      <ExtruderControl
        img={exd1Image}
        heatSwitch={heatSwitch}
        coolSwitch={coolSwitch}
        extrudeSwitch={extrudeSwitch}
        name={"Extruder-1"}
        actual={props.tool0 !== null ? Math.round(props.tool0.actual) : '--'}
        target={props.tool0 !== null ? Math.round(props.tool0.target) : '--'}
        heat={props.heatTool0}
        cool={props.coolTool0}
        extrude={props.extrudeTool}
        />
      <ExtruderControl
        img={exd2Image}
        heatSwitch={heatSwitch}
        coolSwitch={coolSwitch}
        extrudeSwitch={extrudeSwitch}
        name={"Extruder-2"}
        actual={props.tool1 !== null ? Math.round(props.tool1.actual) : '--'}
        target={props.tool1 !== null ? Math.round(props.tool1.target) : '--'}
        heat={props.heatTool1}
        cool={props.coolTool1}
        extrude={props.extrudeTool}
        />
      <BedControl
        img={bedImage}
        heatSwitch={heatSwitch}
        coolSwitch={coolSwitch}
        actual={props.bed !== null ? Math.round(props.bed.actual) : '--'}
        target={props.bed !== null ? Math.round(props.bed.target) : '--'}
        heat={props.heatBed}
        cool={props.coolBed}
      />
    </div>
  );
};

export default extruderBedControl;