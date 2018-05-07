import React from 'react';
import { NavLink } from 'react-router-dom';

import './step-1.css';
import SelectTemp from './components/select-temp';
import Button from '../../../../components/button/button';
import ext1Icon from '../../../../assets/images/extruder-1.svg';
import ext2Icon from '../../../../assets/images/extruder-2.svg';
import bedIcon from '../../../../assets/images/bed-plate.svg';

const selectTemp = (props) => {
  return (
    <div className="preheat-step preheat--step-1">
      <div className="temp-box">
        <div className="temp-inputs flex-row">
          <SelectTemp temp={240} change={props.onExtruder1TempChange} name={'Extruder-1'} image={ext1Icon}/>
          <SelectTemp temp={240} change={props.onExtruder2TempChange} name={'Extruder-2'} image={ext2Icon}/>
          <SelectTemp temp={70} change={props.onBedTempChange} name={'Bed'} image={bedIcon}/>
        </div>
      </div>
      <Button classValue={'btn'} clicked={props.startPreheat}>START</Button>
      {/* <NavLink to={`${props.basePath}/step-2`}>Next</NavLink> */}
    </div>
  );
};

export default selectTemp;