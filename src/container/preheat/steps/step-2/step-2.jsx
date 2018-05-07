import React from 'react';
import { NavLink } from 'react-router-dom';

import './step-2.css';
import ToolProgress from './components/tool-progress';
import CircularProgressbar from "react-circular-progressbar";
import Button from '../../../../components/button/button';
import * as percentageCalculator from '../../../../services/pecentage-calculator';

import ext1Icon from '../../../../assets/images/extruder-1.svg';
import ext2Icon from '../../../../assets/images/extruder-2.svg';
import bedIcon from '../../../../assets/images/bed-plate.svg';

const preheating = (props) => {
  let extruder1Percentage, extruder2Percentage, bedPercentage, overallPercentage;

  /**
   * If the 'temps' object coming from socket data available through Props is not
   * null, then we find the total percentage for each tool (ext1, ext2, bed)
   * and we can find the overall percentage of preheating.
   * 
   * For calculating the percentage we are using the help of percentageCalculator
   * service.
  */
  if (props.temps) {
    extruder1Percentage = percentageCalculator.singlePercentage(props.temps.tool0, props.targets.tool0);
    extruder2Percentage = percentageCalculator.singlePercentage(props.temps.tool1, props.targets.tool1);
    bedPercentage = percentageCalculator.singlePercentage(props.temps.bed, props.targets.bed);
    overallPercentage = percentageCalculator.overallPercentage(props.temps, props.targets);

    if (overallPercentage > 99) {
      props.onCompletePreheat();
    }
  }
  return (
    <div className="preheat-step preheat--step-2">
      <div className="percent-container flex-row">
        <div className="overall-progress-area">
          <p className="heating-up-msg">Heating Up...</p>
          <CircularProgressbar className="preheat-progress" percentage={overallPercentage}/>
          <Button classValue={'btn'} clicked={props.onPreheatCancel}>Cancel</Button>
        </div>
        <div className="tools-progress-area">
          <ToolProgress temps={props.temps.tool0} target={props.targets.tool0} name={'Extruder-1'} percentage={extruder1Percentage} image={ext1Icon}/>
          <ToolProgress temps={props.temps.tool1} target={props.targets.tool1} name={'Extruder-2'} percentage={extruder2Percentage} image={ext2Icon}/>
          <ToolProgress temps={props.temps.bed} target={props.targets.bed} name={'Bed'} percentage={bedPercentage} image={bedIcon}/>
        </div>
      </div>
    </div>
  );
};

export default preheating;